import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  countries: Country[] = [];

  public myForm: FormGroup;

  private apiUrl: string = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.http.get<Country[]>(this.apiUrl).subscribe(countries => {
      this.countries = countries;
    });

    this.myForm = this.fb.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      password: ['Abc123@', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      email: ['johhndoe@example.ma', [Validators.required, Validators.pattern(emailPattern)]],
      country: ['', Validators.required],
      city: ['New York', Validators.required],
      direccion: ['123 Main St', Validators.required],
      paymentMethod: ['tarjeta', Validators.required], // Valor predeterminado: 'tarjeta'
      numsTarjeta: ['1234567890123456', []], // Deja las validaciones vacías para comenzar
      iban: ['', [Validators.pattern(/^[A-Za-z]{2}[0-9]{22}$/)]],
      dateOfExpiry: ['', [Validators.required, this.dateNotBeforeToday]], // Deja las validaciones vacías para comenzar
      cvv: ['123', []], // Deja las validaciones vacías para comenzar
    });


    // Escucha los cambios en el campo paymentMethod
    this.myForm.get('paymentMethod')?.valueChanges.subscribe((paymentMethod) => {
      if (paymentMethod === 'iban') {
        // Si selecciona iban, el campo iban será requerido y validado
        this.myForm.get('iban')?.setValidators([
          Validators.required,
          Validators.pattern(/^[A-Za-z]{2}[0-9]{22}$/),
        ]);
        // Los campos de tarjeta no serán requeridos ni validados
        this.myForm.get('numsTarjeta')?.setValidators([]);
        this.myForm.get('DateOfExpiry')?.setValidators([]);
        this.myForm.get('cvv')?.setValidators([]);
      } else {
        // Si selecciona tarjeta, los campos de tarjeta serán requeridos y validados
        this.myForm.get('numsTarjeta')?.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]{16}$/),
        ]);
        this.myForm.get('DateOfExpiry')?.setValidators([
          Validators.required,
          this.dateNotBeforeToday,
        ]);
        this.myForm.get('cvv')?.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]{3}$/),
        ]);
        // El campo iban no será requerido ni validado
        this.myForm.get('iban')?.setValidators([]);
      }

      // Actualiza las validaciones en los campos
      this.myForm.get('numsTarjeta')?.updateValueAndValidity();
      this.myForm.get('iban')?.updateValueAndValidity();
      this.myForm.get('DateOfExpiry')?.updateValueAndValidity();
      this.myForm.get('cvv')?.updateValueAndValidity();
    });



  }

  dateNotBeforeToday(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = moment(control.value);
    const today = moment();

    if (selectedDate.isBefore(today, 'day')) {
      return { 'dateNotBeforeToday': true };
    }

    return null;
  }



  ngOnInit(): void {


  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(' formulario valido : ', this.myForm.valid)
    if (this.myForm.valid) {
      const user = this.myForm.value;
      console.log(user.dateOfExpiry)
      this.authService.register(user)
        .subscribe({
          next: () => {
            Swal.fire('Registro exitoso', 'El usuario se registró correctamente.', 'success');
            this.router.navigateByUrl('/login');
          },
          error: (message) => {
            Swal.fire('Error', message, 'error');
          }
        });
    } else {
      Swal.fire('Error', 'Por favor, completa todos los campos correctamente.', 'error');
    }
  }


  getFormControls(): string[] {
    return Object.keys(this.myForm.controls);
  }

  getControlErrors(controlName: string): string[] {
    const control = this.myForm.get(controlName);
    return control?.errors ? Object.keys(control.errors) : [];
  }








  onPaymentMethod(event: any) {

    const metodoPago = event.target.value;
    this.myForm.patchValue({
      metodoPago: metodoPago
    });
  }


}
