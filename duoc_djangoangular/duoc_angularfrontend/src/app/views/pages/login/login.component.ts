import { Component,OnInit} from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import {Router} from '@angular/router'
import { LoginService } from 'src/app/services/login-service/login-service.service';
import { loginData } from 'src/app/models/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  public loginForm !: FormGroup
  private sendLogin: loginData = {username:"", password:""};
  public currentUser: any;

  constructor(private formBuilder:FormBuilder, private _loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    if(!!localStorage.getItem('sessionUser')){
      this.router.navigate(['home']);
    }
    this.loginForm = this.formBuilder.group({
      username:[''],
      password:[''],
    })
  }

 login(){
  this.sendLogin.username = this.loginForm.value.username;
  this.sendLogin.password = this.loginForm.value.password;
  // console.log("Sent Data Username/Password: "+this.sendLogin.username +"/"+ this.sendLogin.password)
  this.currentUser = this._loginService.login(this.sendLogin);
  // console.log('current user after the whole call is done: '+ this.currentUser)
  // console.log('and in JSON: '+ JSON.stringify(this.currentUser))
  
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
