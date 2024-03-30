import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonIcon,
  IonContent,
  IonButton,
  IonModal,
  IonList,
  IonLabel,
  IonItem,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-success',
  templateUrl: 'success.page.html',
  styleUrls: ['success.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonModal,
    IonList,
    IonLabel,
    IonItem,
    IonContent,
  ],
})
export class SuccessPage {
  constructor(private modalController: ModalController) {}

  closeModal() {
    return this.modalController.dismiss();
  }
}
