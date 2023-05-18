import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pdtData } from '../../models/pdt-model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorDataService {

  constructor(private http:HttpClient) { }

  private killOrder:string = '';
  private morphOrder:string = '';

  list(): Observable<pdtData[]>{
    return this.http.get<pdtData[]>('http://localhost:8000/api/proveedor/');
  }

  create(newPDT:any) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    return this.http.post('http://localhost:8000/api/proveedor/', JSON.stringify(newPDT), httpOptions);
  }

  edit(idToChange:pdtData) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    this.morphOrder = 'http://localhost:8000/api/proveedor/'+ idToChange.id_proveedor;
    // console.log('morphOrder after appending: '+ this.morphOrder);
    // console.log('your new flesh: '+JSON.stringify(idToChange));
    return this.http.put(this.morphOrder, JSON.stringify(idToChange), httpOptions);
  }

  delete(idToDelete:any) {
    this.killOrder = 'http://localhost:8000/api/proveedor/' + idToDelete;
    // console.log('killOrder after appending: '+ this.killOrder);
    return this.http.delete(this.killOrder);
  }

}
