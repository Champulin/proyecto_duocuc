import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGate implements CanActivate {

  constructor(private auth:AuthService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isAdmin()){
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
  
}
