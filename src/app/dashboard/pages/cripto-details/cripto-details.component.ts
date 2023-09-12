import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { Currency } from '../../interfaces/cripto.interface';
import Swal from 'sweetalert2';


@Component({
  templateUrl: './cripto-details.component.html',
  styleUrls: ['./cripto-details.component.css']
})
export class CriptoDetailsComponent {
  currency?: Currency; // Declarar una variable para almacenar la criptomoneda

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService // Importa tu servicio para obtener los datos
  ) { }

  ngOnInit(): void {
    debugger;
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        console.log(id);
        this.dashboardService.getCriptos(id).subscribe(userCurrencies => {
          console.log(userCurrencies);
          this.currency = userCurrencies.find(userCurrency => {
            return userCurrency.coin.id === id;
          })?.coin;

      });
      });

  }

  showBuyDialog(){
    Swal.fire({
      title: 'Comprar criptomoneda',
      text: 'Ingrese la cantidad que desea comprar:',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Comprar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      inputValidator: (value) => {
        if (!value || parseFloat(value) <= 0) {
          return 'Por favor, ingrese una cantidad válida';
        }
        return 'totdo correcto'
      },
      preConfirm: (amount) => {
        // Aquí puedes realizar la lógica de compra con la cantidad ingresada
        // por ejemplo: this.buyCryptocurrency(amount);
      }
    });
  }
}
