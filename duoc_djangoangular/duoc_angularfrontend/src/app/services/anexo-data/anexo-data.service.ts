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
  private postOrder:string = '';

  list(): Observable<anexoData[]>{
    return this.http.get<anexoData[]>('http://localhost:8000/api/anexo/');
  }

  uploadAnexo(anexoForm:any) {
    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    const options = { headers: headers };
    
    this.postOrder = 'http://localhost:8000/insertar_anexo/';
    return this.http.post(this.postOrder, anexoForm)
  }  
}
