import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginData } from 'src/app/models/login-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private httpOptions: any;
  public activeUser?: any;

  constructor(private http:HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
   }

  public login(login:loginData) {
    // console.log('Login Data on the service: '+JSON.stringify(login))
    this.http.post('http://localhost:8000/login/', JSON.stringify(login), this.httpOptions).subscribe(
      res => {
        this.activeUser = res
        // console.log('Data Returned: '+JSON.stringify(res))
        // console.log('ACTIVEUSER INSIDE RES: '+JSON.stringify(this.activeUser))
        if(this.activeUser != undefined) {
          this.router.navigate(['home']);
        }
      },
      err => {
        console.error(err)
      }
    )    
  }
}
