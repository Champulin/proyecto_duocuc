import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userData, userPatch } from 'src/app/models/user-model';

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

  edit(idToChange:userPatch) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    this.morphOrder = 'http://localhost:8000/api/responsable-edit/'+ idToChange._id;
    // console.log('morphOrder after appending: '+ this.morphOrder);
    console.log('your new flesh: '+JSON.stringify(idToChange));
    return this.http.patch(this.morphOrder, JSON.stringify(idToChange), httpOptions);
    
  }

  delete(idToDelete:any) {
    this.killOrder = 'http://localhost:8000/api/responsable/' + idToDelete;
    console.log('killOrder after appending: '+ this.killOrder);
    return this.http.delete(this.killOrder);
  }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/notificaciones/')
  }
}
