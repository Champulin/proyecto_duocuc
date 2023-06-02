import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { consultaFacultad, consultaUnidad, requestData, requestTrafico, traficoData } from '../../models/consultor-model';

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

  getTrafico(requestBody:requestTrafico): Observable<traficoData[]> {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    this.fetchOrder = 'http://localhost:8000/trafico_llamadas/';
    console.log('request:'+ JSON.stringify(requestBody))
    return this.http.post<traficoData[]>(this.fetchOrder, JSON.stringify(requestBody), httpOptions);
  }
}

  
