import { Component, OnInit } from '@angular/core';

import { navItems, navUser } from './_nav';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems:any;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private auth:AuthService) {}

  public ngOnInit(): void {
    if(this.auth.isAdmin()){
      this.navItems = navItems;
    } else {
      this.navItems = navUser;
    }
}

}
