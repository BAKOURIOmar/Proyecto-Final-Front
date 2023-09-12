import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Cripto, Currency } from '../interfaces/cripto.interface';
import { User, UserCurrency } from 'src/app/auth/interfaces/user.interface';
import { TypeTransaction } from '../interfaces/type-transaction.enum';
import { Transaction } from '../interfaces/transaction.inteface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly baseUrl: string = environment.baseUrl;
  public criptos? : Cripto;

  constructor(private http: HttpClient ){

  }

  getCriptos(userId :number){
   return this.http.get<UserCurrency[]>(`${ this.baseUrl }/usercoin/user/${ userId }`);
  }
  getCriptoById(id: number): Currency | undefined {
    if (this.criptos) {
      return this.criptos.data.find(currency => currency.id === id);
    }
    return undefined;
  }

  buyCryptocurrency( email :string,criptoName :string,amount : number){
    const url=`${ this.baseUrl }/auth/buyCryptocurrency?email=${email }&criptoName=${criptoName }&amount=${amount }`;
    return this.http.post<User>(url,null);
  }

  sellCryptocurrency( email :string,criptoName :string,amountInCripto : number){
    const url=`${ this.baseUrl }/auth/sellCryptocurrency?email=${email }&criptoName=${criptoName }&amount=${amountInCripto }`;
    return this.http.post<User>(url,null);
  }
  depositeMoney( email :string,amount : number){
    const url=`${ this.baseUrl }/auth/depositeMoney?email=${email }&amount=${amount }`;
    return this.http.post<User>(url,null);
  }

  withdrawMoney(email :string,amount : number){
    const url=`${ this.baseUrl }/auth/withdrawMoney?email=${email }&amount=${amount }`;
    return this.http.post<User>(url,null);
  }
    filtertransactions( userEmail: string , fecha? : string  ,  nameCoin? :string  ,  tipoOperacion? :TypeTransaction    ){

      let url = `${this.baseUrl}/Movimientos/filtrar?email=${userEmail}`;

    if ( fecha !== undefined ) {
      url += `&fecha=${fecha}`;
    }

    if ( nameCoin !== undefined) {
      url += `&moneda=${nameCoin}`;
    }

    if ( tipoOperacion !== undefined) {
      url += `&tipoOperacion=${tipoOperacion}`;
    }

    return this.http.get<Transaction[]>(url);
    }



}
