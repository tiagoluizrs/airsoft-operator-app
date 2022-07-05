import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NormalizeService {

  constructor() { }

  removeSpecialCaracteres(value: string): string{
    return value.replace(/[^A-Z0-9]/ig, '');
  }
}
