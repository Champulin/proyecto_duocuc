import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userData } from 'src/app/models/modelo-usuario';

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

}
