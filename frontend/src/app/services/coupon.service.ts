import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export type Coupon = {
  id: number;
  title: string;
  detail: string;
  thumbnail: string;
  price: number;
  organization_name: string;
};

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private _url = environment.url;

  constructor(private httpClient: HttpClient) {}

  getCoupons() {
    return this.httpClient.get<Coupon[]>(`${this._url}/coupons`);
  }

  myCoupons(user_id: number) {
    let params = new HttpParams().set('user_id', user_id);
    return this.httpClient.get<Coupon[]>(`${this._url}/user_coupons`, {
      params,
    });
  }

  createUserCoupon(couponId: number, userId: number) {
    return this.httpClient.post(`${this._url}/user_coupons`, {
      coupon_id: couponId,
      user_id: userId,
    });
  }
}
