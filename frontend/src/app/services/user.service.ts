import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  loadUsers() {
    return this.httpClient.get(`${this.url}/users`);
  }

  postUser(address: string) {
    return this.httpClient.post(`${this.url}/users`, {address: address});
  }
}
