import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Coupon, CouponService } from '../services/coupon.service';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import { BrowserProvider, Contract, formatUnits } from 'ethers';
import { environment } from 'src/environments/environment.dev';
import { User, UserService } from '../services/user.service';
import { WalletService } from '../services/wallet.service';
import Web3 from 'web3';
import FundraiserContract from '../../../contracts/Fundraiser.json';
import { LoadingController } from '@ionic/angular/standalone';

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

const USDTAddress = '0x617f3112bf5397D0467D315cC709EF968D9ba546';

const USDTAbi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)',
  'event Transfer(address indexed from, address indexed to, uint amount)',
];

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

  constructor(
    private couponService: CouponService,
    private userService: UserService,
    private walletService: WalletService,
    private loadingController: LoadingController
  ) {
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
  }

  openConnectModal() {
    this.walletService.subscribeConnection().subscribe();
    return this.modal.open();
  }

  async donate(coupon: Coupon) {
    const loading = await this.loadingController.create();
    await loading.present();
    const amount = coupon.price.toString();
    const web3 = new Web3(this.modal.getWalletProvider());

    const contractABI = FundraiserContract.abi;
    const contractAddress = '0xF014bbE6660B2F2db0151A95d5a391842284ec5d';
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const fromAddress = this.modal.getAddress();
    const currentUser = this.currentUser;
    const couponService = this.couponService;

    contract.methods['donate']()
      .send({
        from: fromAddress,
        value: web3.utils.toWei(amount, 'ether'),
        gas: '650000',
      })
      .then(function (receipt) {
        console.log(receipt);
        loading.dismiss();
        if (currentUser) {
          couponService.createUserCoupon(coupon.id, currentUser.id).subscribe();
        }
      });
  }

  async getBalance() {
    const walletProvider = this.modal.getWalletProvider();

    if (!this.isConnected) throw Error('User disconnected');

    if (walletProvider) {
      try {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        this.address = await signer.getAddress();
        // The Contract object
        const USDTContract = new Contract(USDTAddress, USDTAbi, signer);
        const USDTBalance = await USDTContract['balanceOf'](this.address);
        console.log(formatUnits(USDTBalance, 18));
      } catch (error) {
        console.error(error);
      }
    }
  }
}
