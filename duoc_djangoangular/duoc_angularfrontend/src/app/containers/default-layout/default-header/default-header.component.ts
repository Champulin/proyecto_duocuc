import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private _notDataService:UserDataService, private classToggler: ClassToggleService, private outRouter: Router) {
    super();
  }

  logOut(){
    localStorage.removeItem('sessionUser');
    localStorage.removeItem('sessionData');
    this.outRouter.navigate(['/login']);
  }

  
}
