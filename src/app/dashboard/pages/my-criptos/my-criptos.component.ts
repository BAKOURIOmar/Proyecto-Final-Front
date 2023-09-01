import { Component } from '@angular/core';

@Component({
  templateUrl: './my-criptos.component.html',
  styleUrls: ['./my-criptos.component.css']
})
export class MyCriptosComponent {
  heroes = [
    { name: 'Superman', canFly: true, color: 'Blue' },
    { name: 'Batman', canFly: false, color: 'Black' },
    { name: 'Spiderman', canFly: false, color: 'Red' },
    // ... otros héroes ...
  ];

  orderBy = 'name';

}
