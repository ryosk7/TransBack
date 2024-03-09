import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CouponService } from '../services/coupon.service';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5';
import { environment } from 'src/environments/environment.dev';
import { UserService } from '../services/user.service';

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
  imports: [IonIcon, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
  ],
})
export class HomePage {
  coupons: any;
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
    this.subscriveConnection()
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

  openConnectModal() {
    this.subscriveConnection()
    return this.modal.open();
  }
}
