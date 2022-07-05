import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthEventService {

  constructor() { }

  toggleEyeIcon(eyeIcon, passwordType) {
    if (eyeIcon === 'eye') {
      eyeIcon = 'eye-off';
      passwordType = 'text';
    } else {
      eyeIcon = 'eye';
      passwordType = 'password';
    }

    return [eyeIcon, passwordType];
  }
}
