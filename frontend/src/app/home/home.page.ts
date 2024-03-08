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
import { SiweMessage } from 'siwe'
import { createSIWEConfig } from '@web3modal/siwe'
import type { SIWECreateMessageArgs, SIWESession, SIWEVerifyMessageArgs } from '@web3modal/siwe'

const projectId = environment.wc_key;

const siweConfig = createSIWEConfig({
  createMessage: ({ nonce, address, chainId }: SIWECreateMessageArgs) => {
    new SiweMessage({
      version: '1',
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      statement: 'Sign in With Ethereum.'
    }).prepareMessage(),
    getNonce: async () => {
      const nonce = await getNonce()
      if (!nonce) {
        throw new Error('Failed to get nonce!')
      }

      return nonce
    }
  }
})

// // 2. Set chains
// const testnet = {
//   chainId: 11155111,
//   name: 'Sepolia',
//   currency: 'ETH',
//   explorerUrl: 'https://sepolia.etherscan.io/',
//   rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
// };
// 
// // 3. Create modal
// const metadata = {
//   name: 'ryosk7',
//   description: 'My Website description',
//   url: 'https://mywebsite.com',
//   icons: ['https://avatars.mywebsite.com/'],
// };

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

  constructor(private service: CouponService) {
    this.service.getCoupons().subscribe((data) => {
      this.coupons = data;
    });
  }

  openConnectModal() {
    this.modal.subscribeProvider((data) => {
      if (data.address && data.isConnected && !this.address) {
        this.address = data.address;
        this.isConnected = true;
      }
      if (!data.isConnected && this.address) {
        this.address = "";
        this.isConnected = false;
      }
    })
    return this.modal.open();
  }
}
