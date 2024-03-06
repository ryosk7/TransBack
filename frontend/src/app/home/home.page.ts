import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CouponService } from '../services/coupon.service';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5';
import { environment } from 'src/environments/environment.dev';

const projectId = environment.wc_key;

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};

// 3. Create modal
const metadata = {
  name: 'T-Rex',
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
    chains: [mainnet],
    projectId,
  });

  constructor(private service: CouponService) {
    this.service.getCoupons().subscribe((data) => {
      this.coupons = data;
    });
  }

  openConnectModal() {
    return this.modal.open();
  }
}
