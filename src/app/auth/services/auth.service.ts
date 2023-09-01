import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { PaymentMethod } from '../interfaces/PaymentMethod.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient ){}

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

  login( email: string, password: string ): Observable<boolean> {

    const url  = `${ this.baseUrl }/auth/login`;
    const body = { email, password };

    return this.http.post<User>( url, body )
      .pipe(
        map(response => {
            if(response) {
              localStorage.setItem('currentUser', JSON.stringify(response));
              console.log(response);
              return true};
            return false;
        }),
        catchError( err => throwError( () => err.error.message ))
      );
  }
  register(user: User): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    console.log(user)
    return this.http.post<User>(url, user)
      .pipe(
        map(response => {
          if (response) {
            // Registro exitoso, puedes realizar acciones adicionales si es necesario
            return true;
          }
          return false;
        }),
        catchError(err => throwError(() => err.error.message))
      );
  }

  updatePassword( email: string, newPassword: string ):Observable<boolean>{
    const url  = `${ this.baseUrl }/auth/user/${email}/updatepassword`;


    return this.http.put<User>( url, newPassword )
    .pipe(
      map(response => {
        if (response) {
          // Registro exitoso, puedes realizar acciones adicionales si es necesario

          console.log("contrasena actualizada");

          return true;
        }
        return false;
      }),
      catchError(err => throwError(() => err.error.message))
    );
  }


  updatePaymentMethod(email: string, paymentMethod :PaymentMethod){
    const url  = `${ this.baseUrl }/auth/user/${email}/updatepaymentmethod`;


    return this.http.put<User>( url, paymentMethod )
    .pipe(
      map(response => {
        if (response) {
          // Registro exitoso, puedes realizar acciones adicionales si es necesario

          console.log("contrasena actualizada");

          return true;
        }
        return false;
      }),
      catchError(err => throwError(() => err.error.message))
    );
  }

}