import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.page.html',
  styleUrls: ['./weapon.page.scss'],
})
export class WeaponPage implements OnInit {
  weapon: any = {};

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.weapon !== null) {
        this.weapon = params.weapon;
      };
    });
  }

  ngOnInit() {
  }

}
