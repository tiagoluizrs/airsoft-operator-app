import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from './service/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.authService.isLoggedIn();
    });
  }
}
