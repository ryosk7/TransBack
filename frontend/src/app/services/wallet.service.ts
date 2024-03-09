import { signal, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5';
import { UserService } from './user.service';
import { Observable, concatMap, map } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private _modal = createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [testnet],
    projectId,
  });
  private _isConnected = signal(false);
  private _address = signal("");

  constructor(private userService: UserService) {}

  subscribeConnection(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this._modal.subscribeProvider(
        (data) => {
          if (data.address && data.isConnected && !this._address()) {
            this._address.set(data.address);
            this._isConnected.set(true);
            this.userService.postOrFetchUser(this._address()).subscribe();
          }
          if (!data.isConnected && this._address()) {
            this._address.set("");
            this._isConnected.set(false);
          }

          observer.next(this._isConnected());
        }
      )
    }).pipe(
      concatMap(() => this.userService.postOrFetchUser(this._address())),
      map(() => this._isConnected())
    );
  }
}
