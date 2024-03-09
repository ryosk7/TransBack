import { signal, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

export type User = {
  address: string;
  name: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url = environment.url;
  private _user = signal<User | null>(null);

  constructor(private httpClient: HttpClient) {}

  loadUsers() {
    return this.httpClient.get(`${this._url}/users`);
  }

  postOrFetchUser(address: string) {
    return this.httpClient.post<User>(`${this._url}/users`, {address: address})
    .pipe(tap((user) => this._user.set(user)));
  }

  get currentUser() {
    return this._user;
  }

  set setUser(user: User | null) {
    this._user.set(user);
  }
}
