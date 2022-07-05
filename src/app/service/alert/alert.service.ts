import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController
  ) { }

  async presentAlert(header, message, inputs, buttons) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      message,
      inputs,
      buttons
    });

    await alert.present();
  }
}
