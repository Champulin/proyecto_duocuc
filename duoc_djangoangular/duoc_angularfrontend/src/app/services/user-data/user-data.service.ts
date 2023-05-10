import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }

  //Currently url.py does not have a retrieve all users url for the API, so abandon this service until that has been solved.
/*
  list() {
    return this.http.get('api/usuarios');
  }
*/
}
