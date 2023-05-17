import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userData } from 'src/app/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }

  private killOrder:string = '';
  private morphOrder:string = '';

  list(): Observable<userData[]>{
    return this.http.get<userData[]>('http://localhost:8000/api/responsable/');
  }

  create(newUser:any) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    return this.http.post('http://localhost:8000/api/responsable/', JSON.stringify(newUser), httpOptions);
  }

}
