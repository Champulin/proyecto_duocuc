import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSession?:any;

  constructor() { }

  // Function verifies that user data exists in local storage.
  isLoggedIn() {
    return !!localStorage.getItem('sessionUser');
  }

  // Function verifies that the user data saved in local storage corresponds to an Administrator.
  isAdmin(){
    this.userSession = localStorage.getItem('sessionUser');
    this.userSession = JSON.parse(this.userSession);
    // console.log('this.userSession contents:'+this.userSession)
    // console.log('this.userSession json:'+JSON.stringify(this.userSession))
    // console.log('this.userSession type contents:'+this.userSession.user_type)
    if (this.userSession.user_type == "Administrator"){
      return true;
    } else {
      return false;
    }
  }

}
