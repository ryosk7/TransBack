import { signal, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export type User = {
  id: number;
  address: string;
  name: string;
  avatar: string;
  total_purchase_amount: number;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url = environment.url;
  private _user = signal<User | null>(null);

  constructor(private httpClient: HttpClient) {}

  loadUsers() {
    return this.httpClient.get<User[]>(`${this._url}/users`);
  }

  postOrFetchUser(address: string) {
    return this.httpClient
      .post<User>(`${this._url}/users`, { address: address })
      .pipe(tap((user) => this._user.set(user)));
  }

  get currentUser() {
    return this._user;
  }

  set setUser(user: User | null) {
    this._user.set(user);
  }
}
