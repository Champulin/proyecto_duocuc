import { Component, OnInit } from '@angular/core';
import { userData } from "../../models/modelo-usuario";
// make new user model import goes here
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss']
})

export class GestionUsuariosComponent implements OnInit {

  visible = [false, false];

  selectedUser?: userData;
  public markedUser: userData = { _id: null, name:"", last_name:"", email:"", id_unidad:0, id_facultad:0, username:"", password:"" };

    //var para guardar list de usuarios desde DB
    public users: any;

    //TODO unitNew data handling goes here, adapt to users, needs a new model to import most likely

    //TODO same for editing variables once you're ready for that
 
  onSelect(user: userData): void {
    this.selectedUser = user;
  }

  onMarked(user: userData): void {
    this.markedUser = user;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  public constructor(private _userDataService: UserDataService, private router: Router) {}

  public ngOnInit(): void {
    this.getUsers();
  }

  //Function that retrieves the list of Units from the database.
  getUsers() {
    //Call for the service function list() to retrieve the info for all units in the DB
    this._userDataService.list().subscribe(
      data => {
        // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
        // console.log('Data Received: ' + JSON.stringify(data));
        this.users = data;
      },
      err => console.error(err),
      () => console.log('User list Loaded')
    );
  }

}
