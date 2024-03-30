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
  selector: 'app-success-modal',
  templateUrl: 'success-modal.page.html',
  styleUrls: ['success-modal.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonFooter],
})
export class SuccessModalPage {
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
