import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { unitData } from 'src/app/models/unit-model';

@Injectable({
  providedIn: 'root'
})
export class UnitDataService {

  constructor(private http:HttpClient) { }

  private killOrder:string = '';
  private morphOrder:string = '';

  list(): Observable<unitData[]>{
    return this.http.get<unitData[]>('http://localhost:8000/api/unidad/');

  }

  create(newUnit:any) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    return this.http.post('http://localhost:8000/api/unidad/', JSON.stringify(newUnit), httpOptions);
  }

  edit(idToChange:unitData) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    this.morphOrder = 'http://localhost:8000/api/unidad/'+ idToChange.id_unidad;
    // console.log('morphOrder after appending: '+ this.morphOrder);
    // console.log('your new flesh: '+JSON.stringify(idToChange));
    return this.http.patch(this.morphOrder, JSON.stringify(idToChange), httpOptions);
  }

  delete(idToDelete:any) {
    this.killOrder = 'http://localhost:8000/api/unidad/' + idToDelete;
    // console.log('killOrder after appending: '+ this.killOrder);
    return this.http.delete(this.killOrder);
  }
}
