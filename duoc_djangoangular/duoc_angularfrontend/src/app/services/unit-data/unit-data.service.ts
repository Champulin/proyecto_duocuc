import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitDataService {

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get('/api/unidad');
  }

  // Post method to add new entries, test later as its missing declarations
  // added let to httOptions to declare it as a local variable
  // if it breaks somewhere try this.httpOptions but that should not be the case
  create(newUnit:any) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    return this.http.post('/api/unidad', JSON.stringify(newUnit), httpOptions);
  }

  edit() {}

  delete() {}
}
