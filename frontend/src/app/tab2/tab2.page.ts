import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CouponService } from '../services/coupon.service';
import { environment } from 'src/environments/environment.dev';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5';
import { User, UserService } from '../services/user.service';

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
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {
  coupons: any;
  currentUser: User | null = null;
  modal = createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [testnet],
    projectId,
  });
  isConnected = false;
  address = "";

  constructor(
    private couponService: CouponService,
    private userService: UserService
  ) {
    this.couponService.getCoupons().subscribe((data) => {
      this.coupons = data;
    });
    this.currentUser = this.userService.currentUser()
    if (this.currentUser) {
      this.subscriveConnection()
    }
  }

  openConnectModal() {
    return this.modal.open();
  }

  subscriveConnection() {
    this.modal.subscribeProvider((data) => {
      if (data.address && data.isConnected && !this.address) {
        this.address = data.address;
        this.isConnected = true;
        this.userService.postOrFetchUser(this.address).subscribe();
      }
      if (!data.isConnected && this.address) {
        this.address = "";
        this.isConnected = false;
      }
    })
  }

  shortAddress() {
    if (this.currentUser?.address) {
      return `${this.currentUser?.address.slice(0, 6)}...${this.currentUser?.address.slice(-4)}`;
    } else {
      return null;
    }
  }
}
