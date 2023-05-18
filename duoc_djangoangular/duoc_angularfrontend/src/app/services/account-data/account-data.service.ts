import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { accountData } from 'src/app/models/account-model';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {

  constructor(private http:HttpClient) { }

  private killOrder:string = '';
  private morphOrder:string = '';

  list(): Observable<accountData[]>{
    return this.http.get<accountData[]>('http://localhost:8000/api/cuentapre/');
  }

  create(newAccount:any) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    return this.http.post('http://localhost:8000/api/cuentapre/', JSON.stringify(newAccount), httpOptions);
  }

  edit(idToChange:accountData) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    this.morphOrder = 'http://localhost:8000/api/cuentapre/'+ idToChange.id_facultad;
    // console.log('morphOrder after appending: '+ this.morphOrder);
    // console.log('your new flesh: '+JSON.stringify(idToChange));
    return this.http.patch(this.morphOrder, JSON.stringify(idToChange), httpOptions);
  }

  delete(idToDelete:any) {
    this.killOrder = 'http://localhost:8000/api/cuentapre/' + idToDelete;
    // console.log('killOrder after appending: '+ this.killOrder);
    return this.http.delete(this.killOrder);
  }

}
