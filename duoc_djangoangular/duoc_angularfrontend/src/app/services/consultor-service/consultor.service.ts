import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { consultaFacultad, consultaUnidad, requestData, requestTrafico, traficoData } from '../../models/consultor-model';

@Injectable({
  providedIn: 'root'
})
export class ConsultorService {

  constructor(private http:HttpClient) { }

  private killOrder: string = '';
  private fetchOrder: string = '';

  getConUnidad(): Observable<consultaUnidad[]>{
    this.fetchOrder = 'http://localhost:8000/api/calculo-unidad/';
    console.log('Fetch Order: ' + this.fetchOrder)
    return this.http.get<consultaUnidad[]>(this.fetchOrder);
  }

  getConFacultad(): Observable<consultaFacultad[]>{
    this.fetchOrder = 'http://localhost:8000/api/calculo-facultad/';
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

  getReport(body:any): Observable<any>{
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //    'Content-Type': 'application/json' ,
    //    'responseType': 'blob' 
    //   })
    // };
    this.fetchOrder = 'http://localhost:8000/generar_reporte/';
    return this.http.post(this.fetchOrder, body);
  }

  emptyFolder(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    this.killOrder = 'http://localhost:8000/generar_reporte/borrar/';

    console.log('Sending kill order!: ' + this.killOrder)
    
    return this.http.post(this.killOrder, this.killOrder, httpOptions);
  }
}

  
