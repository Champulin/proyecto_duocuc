import { Component, OnInit } from '@angular/core';
import { userData } from '../../models/user-model';
import { userNew } from '../../models/user-new';
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

    // variables para crear nuevo objeto en DB
    public newUser : userNew = {name: 'Nombre', last_name: 'Apellido', email: 'nombre.apellido@gmail.com', 
                                id_unidad: 99, id_facultad: 99, username:'username1', password:'password1'};
    newName:string = '';
    newLastName:string = '';
    newMail:string = '';
    newUnit?:any;
    newFacultad?:any;
    newUsername:string = '';
    newPass:string = '';

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

  createUser() {
    this.saveUser();
    this._userDataService.create(this.newUser).subscribe(
     data => {
        console.log('Data Sent: ' + JSON.stringify(data));
        console.log('Make User order executed')
        this.getUsers();
        return true;
      },
      error => {
        console.error('Error creating User');
        return throwError(error);
      }
    )
  }

  saveUser() {
    this.newUser.name = this.newName;
    this.newUser.last_name = this.newLastName;
    this.newUser.email = this.newMail;
    this.newUser.id_unidad = this.newUnit;
    this.newUser.id_facultad = this.newFacultad;
    this.newUser.username = this.newUsername;
    this.newUser.password = this.newPass;
  }


  // Changes the visibility value of elements with a visibility toggle
  toggleCollapse(id: number): void {
    this.visible[id] = !this.visible[id];
  }

}
