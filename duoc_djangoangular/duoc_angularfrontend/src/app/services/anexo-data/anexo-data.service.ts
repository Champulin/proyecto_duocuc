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
  private sendOrder:any = {id_anexo:0, id_facultad:0, mes:0};

  list(): Observable<anexoData[]>{
    return this.http.get<anexoData[]>('http://localhost:8000/api/anexo/');
  }

  uploadAnexo(anexoForm:any) {
    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    const options = { headers: headers };
    
    this.postOrder = 'http://localhost:8000/insertar_anexo/';
    return this.http.post(this.postOrder, anexoForm)
  }  

  fixAnexo(){

  }

  runUnit(anexoForm:any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    const body = anexoForm;
    
    this.postOrder = 'http://localhost:8000/calculo_unidad/';
    console.log('In Service Body: ' + body)
    console.log('In Service URL:' + this.postOrder)
    return this.http.post(this.postOrder, body, options)
  } 

  // runUnitCalculations(body:any) {
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //      'Content-Type': 'application/json' ,
  //     })
  //   };
  //   this.postOrder = 'http://localhost:8000/calculo_unidad/';
  //   this.sendOrder.id_anexo = body.id_anexo;
  //   console.log(JSON.stringify(this.sendOrder))
  //   return this.http.post(this.postOrder, JSON.stringify(this.sendOrder), httpOptions);
  // }

  runFacultyCalculations(body:any){
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    this.postOrder = 'http://localhost:8000/calculo_general/';
    return this.http.post(this.postOrder, JSON.stringify(body), httpOptions)
  }

}
