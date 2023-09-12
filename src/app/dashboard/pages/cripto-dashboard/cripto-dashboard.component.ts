import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { User, UserCurrency } from 'src/app/auth/interfaces/user.interface';

@Component({
  templateUrl: './cripto-dashboard.component.html',
  styleUrls: ['./cripto-dashboard.component.css']
})
export class CriptoDashboardComponent {
  public userCurrencies: UserCurrency[] = [];
  user: User | null = null;
  public TotalInEuros: number = 0;
  loading = false;
  constructor(private dashboardService: DashboardService, private authService: AuthService) {

    this.authService.getCurrentUser().subscribe((cu) => {
      if (cu) {

        this.user = cu;
        // Obtener todas las criptomonedas desde la API de Coin Market Cap.
        this.showLoader();
        this.dashboardService.getCriptos(cu.id).subscribe((criptos) => {
          console.log(criptos)
          this.userCurrencies = criptos;
          criptos.forEach(cripto => {
            const priceCriptoInEuros = cripto.marketPrice * cripto.quantity;
            if (cripto.coin.symbol == 'EUR') {
              this.TotalInEuros += cripto.quantity;
            }
            this.TotalInEuros += priceCriptoInEuros;
          });
          this.hideLoader();
        });
      }
    });
  }
    // Función para mostrar el loader
    showLoader() {
      this.loading = true;
      Swal.fire({
        title: 'Cargando criptomonedas...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    }

    // Función para ocultar el loader
    hideLoader() {
      this.loading = false;
      Swal.close();
    }

  showBuyDialog(action: string, criptoname: string) {
    Swal.fire({
      title: `${action} criptomoneda`,
      text: `Ingrese la cantidad que desea ${action} :`,
      html:
        `<input id="cantidad" type="number" placeholder="Cantidad" class="swal2-input">` +
        `<input id="ibanOtarjeta" type="text" placeholder="IBAN O  Tarjeta" class="swal2-input">`,
      showCancelButton: true,
      confirmButtonText: `${action}`,
      cancelButtonText: 'Cancelar',
      reverseButtons: true,

      preConfirm: () => {
        debugger;
        // Aquí puedes realizar la lógica de compra con la cantidad ingresada
        const amountInput = document.getElementById('cantidad') as HTMLInputElement;
        const ibanOtarjetaInput = document.getElementById('ibanOtarjeta') as HTMLInputElement;

        // Obtener los valores de cantidad y IBAN
        const amount = parseFloat(amountInput.value);
        const ibanOtarjeta = ibanOtarjetaInput.value;
        const ibanPattern = /^[A-Za-z]{2}[0-9]{22}$/; // Ejemplo: IBAN español de 24 caracteres
        const numsTarjetaPattern = /^[0-9]{16}$/;

        // Validar la cantidad
        if (isNaN(amount) || amount <= 0) {
          Swal.showValidationMessage('Por favor, ingrese una cantidad válida');

        }



        else if (this.user!.paymentMethod === 'iban') {

          if (!ibanPattern.test(ibanOtarjeta)) {
            Swal.showValidationMessage('Por favor, ingrese un IBAN válido , 2 letras y 22 numerps ');
          } else if (this.user!.iban !== ibanOtarjeta) {
            Swal.showValidationMessage('El Iban Introducito es Incorrecto');
          }else {

            if (action == 'Comprar') {
              this.buyCryptocurrency(this.user!.email, criptoname, amount);
            } else if (action == 'Vender') {
              this.sellCryptocurrency(this.user!.email, criptoname, amount);
            } else if (action == 'Agregar') {
              this.depositeMoney(this.user!.email, amount);
            } else if (action == 'Retirar') {
              this.withdrawMoney(this.user!.email, amount);
            }
          }

        }
        else if (this.user!.paymentMethod === 'tarjeta') {
          if (!numsTarjetaPattern.test(ibanOtarjeta)) {
            Swal.showValidationMessage('Por favor, ingrese unos numeros de tarjeta válidos ,  16 numeros');
          } else if (this.user!.numsTarjeta !== ibanOtarjeta) {
            Swal.showValidationMessage('los numero de tarjeta Introducitos son Incorrectos');
          }else {

            if (action == 'Comprar') {
              this.buyCryptocurrency(this.user!.email, criptoname, amount);
            } else if (action == 'Vender') {
              this.sellCryptocurrency(this.user!.email, criptoname, amount);
            } else if (action == 'Agregar') {
              this.depositeMoney(this.user!.email, amount);
            } else if (action == 'Retirar') {
              this.withdrawMoney(this.user!.email, amount);
            }
          }
        }
      }

    });
  }

  buyCryptocurrency(email: string, criptoName: string, amount: number) {
    this.dashboardService.buyCryptocurrency(email, criptoName, amount).subscribe({
      next: () => {
        Swal.fire({
          title: 'Compra exitosa',
          text: 'la Compra se ha efecuado  correctamente.',
          icon: 'success',
          didClose: () => {
            location.reload();
          }
        });
      },
      error: (err) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    });
  }

  sellCryptocurrency(email: string, criptoName: string, amountInEuros: number) {
    const userCurrency = this.userCurrencies.find(userCu => userCu.coin.name === criptoName);
    const AmountInCripto = amountInEuros / userCurrency!.marketPrice;
    this.dashboardService.sellCryptocurrency(email, criptoName, AmountInCripto).subscribe({
      next: () => {
        Swal.fire({
          title: 'Venta exitosa',
          text: 'la Venta se ha efecuado  correctamente.',
          icon: 'success',
          didClose: () => {
            location.reload();
          }
        });

      },
      error: (err) => {
        console.log(err);
        Swal.fire('Error', err.error.message, 'error');
      }
    });
  }

  depositeMoney(email: string, amount: number) {
    this.dashboardService.depositeMoney(email, amount).subscribe({
      next: () => {
        Swal.fire({
          title: 'Deposito exitoso',
          text: 'El Deposito se ha efecuado  correctamente.',
          icon: 'success',
          didClose: () => {
            location.reload();
          }
        });
      },
      error: (err) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    });
  }

  withdrawMoney(email: string, amount: number) {
    this.dashboardService.withdrawMoney(email, amount).subscribe({
      next: () => {
        Swal.fire({
          title: 'Retiro exitoso',
          text: 'El Retiro se ha efecuado  correctamente.',
          icon: 'success',
          didClose: () => {
            location.reload();
          }
        });
      },
      error: (err) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    });
  }
}

