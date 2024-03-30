import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  ModalController,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Coupon, CouponService } from '../services/coupon.service';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import { BrowserProvider, Contract, formatUnits } from 'ethers';
import { environment } from 'src/environments/environment';
import { User, UserService } from '../services/user.service';
import { WalletService } from '../services/wallet.service';
import Web3 from 'web3';
import FundraiserContract from '../../../contracts/Fundraiser.json';
import { LoadingController } from '@ionic/angular/standalone';
import { SuccessModalPage } from '../success-modal/success-modal.page';

const cc = require('cryptocompare');

const projectId = environment.wc_key;

// 2. Set chains
const testnet = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io/',
  rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
};

// 3. Create modal
const metadata = {
  name: 'ryosk7',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/'],
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
  ],
})
export class HomePage {
  coupons: Coupon[] = [];
  modal = createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [testnet],
    projectId,
  });
  isConnected = false;
  address = '';
  currentUser: User | null = null;
  remainingBalance = '---';
  jpyToEthRate = null;

  constructor(
    private couponService: CouponService,
    private userService: UserService,
    private walletService: WalletService,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {
    console.log('production?: ', environment.production);
    this.couponService.getCoupons().subscribe((data) => {
      this.coupons = data;
    });
    this.currentUser = this.userService.currentUser();
    if (!this.currentUser) {
      this.walletService.subscribeConnection().subscribe((isConnected) => {
        this.isConnected = isConnected;
      });
    } else {
      this.isConnected = true;
    }

    const jpyAmount = 1100000;
    this.convertJPYtoETHRate().then((rate) => {
      this.jpyToEthRate = rate.JPY;
    });

    this.convertJPYtoETH(jpyAmount).then((ethAmount) => {
      this.remainingBalance = ethAmount.toFixed(2);
    });
  }

  async presentModal(coupon: Coupon) {
    const modal = await this.modalController.create({
      component: SuccessModalPage,
      cssClass: 'success-modal',
      componentProps: {
        coupon: coupon,
      },
    });
    return await modal.present();
  }

  openConnectModal() {
    this.walletService.subscribeConnection().subscribe();
    return this.modal.open();
  }

  snapTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // 時間と分が1桁の場合、先頭に0を追加する
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}時${formattedMinutes}分時点`;
  }

  async convertJPYtoETHRate() {
    return await cc.price('ETH', ['JPY']);
  }

  async convertJPYtoETH(jpyAmount: number) {
    const exchangeRate = await cc.price('ETH', ['JPY']);
    const ethAmount = jpyAmount / exchangeRate.JPY;
    return ethAmount;
  }

  exchangeRate(jpyAmount: number) {
    let amount = '---';
    if (this.jpyToEthRate) {
      amount = (jpyAmount / this.jpyToEthRate).toFixed(4);
    }
    return amount;
  }

  async donate(coupon: Coupon) {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      const amount = coupon.price;
      const ethAmount = await this.convertJPYtoETH(amount);
      const web3 = new Web3(this.modal.getWalletProvider());

      const contractABI = FundraiserContract.abi;
      const contractAddress = '0xF014bbE6660B2F2db0151A95d5a391842284ec5d';
      const walletProvider = this.modal.getWalletProvider();
      if (!walletProvider) {
        return;
      }
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      contract
        .getFunction('donate')
        .send({
          from: this.modal.getAddress(),
          value: web3.utils.toWei(ethAmount, 'ether'),
          gas: '650000',
        })
        .then((receipt) => {
          console.log(receipt);
          loading.dismiss();
          const donateUser = this.userService.currentUser();
          if (donateUser) {
            this.couponService
              .createUserCoupon(coupon.id, donateUser.id)
              .subscribe();
            this.presentModal(coupon);
          }
        });
    } catch (error) {
      console.error(error);
      loading.dismiss();
    }
  }
}
