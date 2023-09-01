import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public myForm: FormGroup = this.fb.group({
    email: ['johhndoe@example.ma', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['Abc123@', Validators.required]
    });

  constructor(private http: HttpClient, private fb: FormBuilder ,private authService : AuthService ,private router :Router  ) { }



  // Función para manejar el envío del formulario
  onSubmit() {
    const { email, password } = this.myForm.value;
 console.log(email,'    ' ,password )
    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          Swal.fire('Error', message, 'error' )
          this.myForm.markAllAsTouched();
        }
      })

  }

}
