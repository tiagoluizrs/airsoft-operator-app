import { Component, OnInit } from '@angular/core';
import { AuthEventService } from '../service/utils/auth-event.service';
import { ToastService } from '../service/toast/toast.service';
import { AuthService } from '../service/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  eyeIcon = 'eye';
  passwordType = 'password';

  constructor(
    private authEventService: AuthEventService,
    private toastService: ToastService,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  toggleEyeIcon() {
    const result = this.authEventService.toggleEyeIcon(this.eyeIcon, this.passwordType);
    this.eyeIcon = result[0];
    this.passwordType = result[1];
  }

  async login(form) {
    if (form.value.password.length < 3) {
      this.toastService.presentToast('Digite uma senha com 6 ou mais caractéres');
      return;
    }
    this.authService.login({
      username: form.value.username,
      password: form.value.password
    });
  }
}
