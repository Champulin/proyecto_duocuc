import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications:number = 0;
  public notAdmin:boolean = true;
  public allNotes:any[]=[];
  public sessionData:any;
  public myNotes:any[]=[];
  public newNotes:any[]=[];
  private idFilter:any;

  constructor(private _adminCheck:AuthService, private _notDataService:UserDataService, private classToggler: ClassToggleService, private outRouter: Router) {
    super();
  }

  ngOnInit(): void {
    this.checkAdmin();
    this._notDataService.getNotifications().subscribe(
      data => {
        // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
        console.log('Data Received: ' + JSON.stringify(data));
        this.allNotes = data;
        this.filterData();
      },
      err => console.error(err),
      () => console.log('Notifications List Loaded')
    );
  }

  filterData(){
    if (this.notAdmin) {
      console.log('I AM NOT AN ADMIN')
      this.sessionData = localStorage.getItem('sessionUser')
      this.sessionData = JSON.parse(this.sessionData);
      this.idFilter = this.sessionData.id_unidad
      console.log('id unidad: ' + this.idFilter)
      console.log('AllNotes' + JSON.stringify(this.allNotes))
      for(let i in this.allNotes){
        console.log('Round and round it goes: ' + i )
        console.log('ID:' + this.allNotes[i].id_unidad)
        console.log('The Note: '+JSON.stringify(this.allNotes[i]));
        if(this.allNotes[i].id_unidad==this.idFilter){
          this.myNotes.push(this.allNotes[i]);
        }
      }
      for(let i in this.myNotes){
        if(this.myNotes[i].estado==false){
          this.newNotes.push(this.myNotes[i])
        }
      }
    }
    console.log('Notas Filtradas: ' + JSON.stringify(this.myNotes) )
    this.newNotifications = this.newNotes.length;
  }

  logOut(){
    localStorage.removeItem('sessionUser');
    localStorage.removeItem('sessionData');
    this.outRouter.navigate(['/login']);
  }
  
  checkAdmin(){
    this.notAdmin = !this._adminCheck.isAdmin()
  }

}
