import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Coupon, CouponService } from '../services/coupon.service';
import { environment } from 'src/environments/environment.dev';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import { User, UserService } from '../services/user.service';
import { WalletService } from '../services/wallet.service';

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
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
  ],
})
export class Tab2Page {
  coupons: Coupon[] = [];
  currentUser: User | null = null;
  modal = createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [testnet],
    projectId,
  });
  isConnected = false;
  address = '';

  constructor(
    private couponService: CouponService,
    private userService: UserService,
    private walletService: WalletService
  ) {
    this.couponService.getUserCoupons().subscribe((data) => {
      this.coupons = data;
    });
    this.currentUser = this.userService.currentUser();
    if (!this.currentUser) {
      this.walletService.subscribeConnection().subscribe(() => {
        this.currentUser = this.userService.currentUser();
        this.isConnected = this.walletService.isConnected();
      });
    } else {
      this.isConnected = true;
    }
  }

  openConnectModal() {
    return this.modal.open();
  }

  shortAddress() {
    if (this.currentUser?.address) {
      return `${this.currentUser?.address.slice(
        0,
        6
      )}...${this.currentUser?.address.slice(-4)}`;
    } else {
      return null;
    }
  }
}
