import { Component, Input } from '@angular/core';
import {
  ModalController,
  NavParams,
  IonContent,
  IonFooter,
} from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { Coupon } from '../services/coupon.service';

@Component({
  selector: 'app-coupon-modal',
  templateUrl: 'coupon-modal.page.html',
  styleUrls: ['coupon-modal.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonFooter],
})
export class CouponModalPage {
  coupon: Coupon | undefined;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.coupon = this.navParams.data['coupon'];
  }

  closeModal() {
    return this.modalController.dismiss();
  }
}
