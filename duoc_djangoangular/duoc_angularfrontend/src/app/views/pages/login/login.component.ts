import { HttpClient } from '@angular/common/http';
import { Component,OnInit} from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import {Router} from '@angular/router'
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { loginData } from 'src/app/models/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  public loginForm !: FormGroup
  private sendLogin: loginData = {username:"", password:""};

  constructor(private formBuilder:FormBuilder, private _loginService:LoginServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:[''],
      password:[''],
    })
  }

 login(){
  console.log("Form Username/Password: "+this.loginForm.value.username +"/"+ this.loginForm.value.password)
  this.sendLogin.username = this.loginForm.value.username;
  this.sendLogin.password = this.loginForm.value.password;
  console.log("Sent Data Username/Password: "+this.sendLogin.username +"/"+ this.sendLogin.password)
  this._loginService.login(this.sendLogin);
  
 }



  // Old Login Method without service and reading a JSON

  // this.http.get<any>("http://localhost:3000/signupUsers")
  //   .subscribe(res =>{
  //     const user = res.find((a:any)=>{
  //       console.log('A Pass:' + a.password)
  //       console.log('A Data:' + a.username)
  //       return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
  //     })

  //     console.log('User Status:' + user)
  //     console.log(JSON.stringify(res))

  //     if( user){
  //     alert("Login success")
  //     this.loginForm.reset();
  //     this.router.navigate(['home']);
  //     } else{
  //       alert("El nombre de usuario no existe")
  //     }
  //   },
  //   err=>{
  //     alert("Incorrecto")

  //   })
}
