import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  constructor(
    private loadingController: LoadingController
  ) { }

  async preloading(message): Promise<any> {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message,
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();
    return loading;
  }


}
