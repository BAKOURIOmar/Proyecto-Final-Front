import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Cripto, Currency } from '../interfaces/cripto.interface';
import { User } from 'src/app/auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly baseUrl: string = environment.baseUrl;
  public criptos? : Cripto;

  constructor(private http: HttpClient ){

  }

  getCriptos(){
   return this.http.get<Cripto>(`${ this.baseUrl }/api/coinmarketcap/latest`);
  }
  getCriptoById(id: number): Currency | undefined {
    if (this.criptos) {
      return this.criptos.data.find(currency => currency.id === id);
    }
    return undefined;
  }




}
