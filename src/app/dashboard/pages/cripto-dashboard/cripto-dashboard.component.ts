import { Component } from '@angular/core';
import { Currency } from '../../interfaces/cripto.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  templateUrl: './cripto-dashboard.component.html',
  styleUrls: ['./cripto-dashboard.component.css']
})
export class CriptoDashboardComponent {
  public currencies :Currency[]=[];


  constructor(private dashboardService : DashboardService){
    this.dashboardService.getCriptos().subscribe(criptos => {
      console.log(criptos);
      this.currencies = criptos.data;
  });
}
}
