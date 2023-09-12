import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SelectButton } from 'primeng/selectbutton';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User | null = null;
  public passwordForm: FormGroup;
  public paymentForm: FormGroup;

  paymentOptions = [
    { label: 'Tarjeta', value: 'tarjeta' },
    { label: 'IBAN', value: 'iban' }
  ];


  @ViewChild('switchButton') switchButton!: SelectButton;

  switchOptions = [
    { label: 'Editar Contraseña', value: 'password' },
    { label: 'Editar Método de Pago', value: 'payment' }
  ];


  showPasswordForm = true; // Controla la visibilidad del formulario de cambio de contraseña
  showPaymentForm = false; // Controla la visibilidad del formulario de método de pago


  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      newPassword: ['', [Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      confirmPassword: ['', [Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]]
    });



    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      numsTarjeta: ['', []],
      iban: ['', [Validators.pattern(/^[A-Za-z]{2}[0-9]{22}$/)]],
      dateOfExpiry: ['', [Validators.required, this.dateNotBeforeToday]],
      cvv: ['', []],
    });
    // Escucha los cambios en el campo paymentMethod
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe((paymentMethod) => {
      if (paymentMethod === 'iban') {
        // Si selecciona iban, el campo iban será requerido y validado
        this.paymentForm.get('iban')?.setValidators([
          Validators.required,
          Validators.pattern(/^[A-Za-z]{2}[0-9]{22}$/),
        ]);
        // Los campos de tarjeta no serán requeridos ni validados
        this.paymentForm.get('numsTarjeta')?.setValidators([]);
        this.paymentForm.get('DateOfExpiry')?.setValidators([]);
        this.paymentForm.get('cvv')?.setValidators([]);
      } else {
        // Si selecciona tarjeta, los campos de tarjeta serán requeridos y validados
        this.paymentForm.get('numsTarjeta')?.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]{16}$/),
        ]);
        this.paymentForm.get('DateOfExpiry')?.setValidators([
          Validators.required,
          this.dateNotBeforeToday,
        ]);
        this.paymentForm.get('cvv')?.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]{3}$/),
        ]);
        // El campo iban no será requerido ni validado
        this.paymentForm.get('iban')?.setValidators([]);
      }
      // Actualiza las validaciones en los campos
      this.paymentForm.get('numsTarjeta')?.updateValueAndValidity();
      this.paymentForm.get('iban')?.updateValueAndValidity();
      this.paymentForm.get('DateOfExpiry')?.updateValueAndValidity();
      this.paymentForm.get('cvv')?.updateValueAndValidity();

    });
  }

  ngOnInit(): void {
     this.authService.getCurrentUser().subscribe( uc =>
      this.user =uc
     );
     if (this.user) {
      this.paymentForm.patchValue({
        paymentMethod: this.user.paymentMethod,
      });
    }
  }



  onSwitchFormChange(selectedValue: string) {
    this.showPasswordForm = selectedValue === 'password';
    this.showPaymentForm = selectedValue === 'payment';
  }
  onSubmitPassword() {
    this.paymentForm.markAllAsTouched();
    if (this.passwordForm.valid) {

      const email = this.authService.getCurrentUserEmail(); // Obtén el email del usuario actual
      const newPassword = this.passwordForm.get('newPassword')?.value;

      if (email && newPassword) {
        this.authService.updatePassword(email, newPassword)
          .subscribe(
            success => {
              if (success) {
                // Contraseña actualizada exitosamente
                Swal.fire({
                  icon: 'success',
                  title: 'Contraseña actualizada',
                  showConfirmButton: false,
                  timer: 1500
                });
                // Limpia el formulario
                this.passwordForm.reset();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error al actualizar la contraseña',
                });
              }
            },
            error => {
              console.error("Error al actualizar la contraseña:", error);
            }
          );
      }
    }
  }

  onSubmitPaymentMethod() {
    // Lógica para cambiar el método de pago
    debugger;
    console.log(this.paymentForm.value)
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.valid) {
      const email = this.authService.getCurrentUserEmail(); // Obtén el email del usuario actual
      const paymentMethod = this.paymentForm.value;
      console.log(paymentMethod)
      if (email && paymentMethod) {
        this.authService.updatePaymentMethod(email, paymentMethod)
          .subscribe(
            success => {
              if (success) {
                // Contraseña actualizada exitosamente
                Swal.fire({
                  icon: 'success',
                  title: 'Metodo de pago actualizada',
                  showConfirmButton: false,
                  timer: 1500
                });
                // Limpia el formulario
                this.passwordForm.reset();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error al actualizar la contraseña',
                });
              }
            },
            error => {
              console.error("Error al actualizar la contraseña:", error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al actualizar la contraseña${error}`,
              });
            }
          );
      }
    }else{
      console.error("Error al actualizar la contraseña:");
    }
  }
  dateNotBeforeToday(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = moment(control.value);
    const today = moment();

    if (selectedDate.isBefore(today, 'day')) {
      return { 'dateNotBeforeToday': true };
    }

    return null;
  }
}
