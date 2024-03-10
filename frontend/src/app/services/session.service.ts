import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  currentUserSession(address: string) {
    const options = {
      params: new HttpParams().set('address', address)
    };
    return this.httpClient.get(`${this.url}/current_user_set`, options);
  }
}
