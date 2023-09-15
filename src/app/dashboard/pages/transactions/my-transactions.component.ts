import { Component, OnInit } from '@angular/core';
import { TypeTransaction } from '../../interfaces/type-transaction.enum';
import { Transaction } from '../../interfaces/transaction.inteface';
import { DashboardService } from '../../services/dashboard.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.css']
})
export class MyTransactionsComponent implements OnInit {
  fecha?: string ;
  tipoOperacion?: TypeTransaction ;
  tipoOperaciones :any[]=[];
  moneda ?: string ;
  monedas: any[] =[];
  movimientos: Transaction[] = [];
   private currentUser :User | null = null;

   constructor(private dashboardService: DashboardService, private authService: AuthService,private router: Router) {
    const userEmail = localStorage.getItem('currentUserEmail');

      if (!userEmail) {

        this.router.navigate(['/login']);
      }
  }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe((cu) => {
      if (cu) {
        this.currentUser = cu;
        //console.log('user1', this.currentUser);
        this.tipoOperaciones = [
          { label: 'Compra', value: 'COMPRA' },
          { label: 'Venta', value: 'VENTA' },
          { label: 'Ingreso de Euros', value: 'INGRESO_EUROS' },
          { label: 'Retiro de Euros', value: 'RETIRO_EUROS' },
        ];
        // Llamar a la función para cargar las monedas después de obtener el usuario actual
        this.loadMonedas();
        this.dashboardService.filtertransactions( this.currentUser!.email ).subscribe(transactions => {
          this.movimientos = transactions;
          console.log(this.movimientos);
        });
      }
    });



  }

  // Función para cargar las monedas después de obtener el usuario actual
  loadMonedas() {

    this.dashboardService.getCriptos(this.currentUser!.id).subscribe(userCoins => {
      userCoins.forEach(usercoin => {
        this.monedas.push({ label: usercoin.coin.name, value: usercoin.coin.name });

      });
    });
  }

  buscarMovimientos() {
    debugger;
    if (this.fecha) {
      // Reemplaza todos los guiones "-" con barras "/"
      this.fecha = this.fecha.replace(/-/g, '/');
    }
    this.dashboardService.filtertransactions( this.currentUser!.email ,this.fecha, this.moneda, this.tipoOperacion).subscribe(transactions => {
      this.movimientos = transactions;
      //console.log(this.movimientos);
    this.fecha = undefined ;

    });

  }


}
