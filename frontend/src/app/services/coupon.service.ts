import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Coupon = {
  id: number;
  title: string;
  detail: string;
  thumbnail: string;
  price: string;
  organization_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getCoupons() {
    return this.httpClient.get<Coupon[]>(`${this.url}/coupons`);
  }

  getUserCoupons() {
    return this.httpClient.get<Coupon[]>(`${this.url}/user_coupons`);
  }
}
