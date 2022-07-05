import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeaponPageRoutingModule } from './weapon-routing.module';

import { WeaponPage } from './weapon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeaponPageRoutingModule
  ],
  declarations: [WeaponPage]
})
export class WeaponPageModule {}
