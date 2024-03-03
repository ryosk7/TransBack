import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getCoupons() {
    return this.httpClient.get(`${this.url}/coupons`);
  }
}
