import { HttpClient } from '@angular/common/http';
import { Component,OnInit} from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  public loginForm !: FormGroup

  constructor(private formBuilder:FormBuilder,
    private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario:[''],
      contraseña:[''],
    })
  }

 login(){
  console.log((this.loginForm.value.usuario))

  this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res =>{
      const user = res.find((a:any)=>{
        console.log('A Pass:' + a.contraseña)
        console.log('A Data:' + a.usuario)
        return a.usuario === this.loginForm.value.usuario && a.contraseña === this.loginForm.value.contraseña
      })

      console.log('User Status:' + user)
      console.log(JSON.stringify(res))

      if( user){
      alert("Login success")
      this.loginForm.reset();
      this.router.navigate(['home']);
      } else{
        alert("Usuario incorrecto")
      }
    },
    err=>{
      alert("Incorrecto")

    })
  }
}
