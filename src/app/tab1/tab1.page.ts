import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { RequestService } from '../service/request/request.service';
import { environment } from '../../environments/environment';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  weapons: any = [];
  url: string = environment.url;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private requestService: RequestService
  ) {
    this.getWeapons(1);
  }

  async getWeapons(page){
    const response = await this.requestService.get(`${this.url}/api/weapon/`, {}, {});
    if (response.status !== 200) {return;}
    this.weapons = response.data;
  }

  logout() {
    this.authService.logout();
  }

  goToWeapon(weapon){
    const navExtras: NavigationExtras = {
      queryParams: {
        weapon,
      }
    };

    this.navCtrl.navigateForward('weapon', navExtras);
  }
}
