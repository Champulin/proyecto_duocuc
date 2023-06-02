import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { consultaFacultad, consultaUnidad } from '../../models/consultor-model';

@Injectable({
  providedIn: 'root'
})
export class ConsultorService {

  constructor(private http:HttpClient) { }

  private fetchOrder: string = '';

  getConUnidad(unit:number): Observable<consultaUnidad[]>{
    this.fetchOrder = 'http://localhost:8000/api/calculo-unidad/' + unit;
    console.log('Fetch Order: ' + this.fetchOrder)
    return this.http.get<consultaUnidad[]>(this.fetchOrder);
  }

  getConFacultad(faculty:number): Observable<consultaFacultad[]>{
    this.fetchOrder = 'http://localhost:8000/api/calculo-facultad/' + faculty;
    console.log('Fetch Order: ' + this.fetchOrder)
    return this.http.get<consultaFacultad[]>(this.fetchOrder);
  }
}
