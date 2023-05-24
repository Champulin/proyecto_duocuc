import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userData } from 'src/app/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }

  private killOrder:string = '';
  private morphOrder:string = '';

  list(): Observable<userData[]>{
    return this.http.get<userData[]>('http://localhost:8000/api/responsable/');
  }

  // TODO: Currently using the generic, have to alter it so that it takes both admin and responsable as user types
  // through the crearUsuario/ url api
  create(newUser:any) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    return this.http.post('http://localhost:8000/api/responsable/', JSON.stringify(newUser), httpOptions);
  }

  edit(idToChange:userData) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    this.morphOrder = 'http://localhost:8000/api/responsable/'+ JSON.stringify(idToChange._id);
    console.log('morphOrder after appending: '+ this.morphOrder);
    console.log('your new flesh: '+JSON.stringify(idToChange));
    return this.http.patch(this.morphOrder, JSON.stringify(idToChange), httpOptions);
    
  }

}
