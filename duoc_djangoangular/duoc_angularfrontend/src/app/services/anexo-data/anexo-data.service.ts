import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { anexoData } from 'src/app/models/anexo-model';

@Injectable({
  providedIn: 'root'
})
export class AnexoDataService {

  constructor(private http:HttpClient) { }

  private killOrder:string = '';
  private morphOrder:string = '';

  list(): Observable<anexoData[]>{
    return this.http.get<anexoData[]>('http://localhost:8000/api/anexo/');
  }
  
}
