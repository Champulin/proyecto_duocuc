import { Component, OnInit } from '@angular/core';
import { userData } from '../../models/user-model';
import { userNew } from '../../models/user-new';
import { userPatch } from '../../models/user-edit';
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

    //variables para editar 
    public bodyUser : userPatch = {_id: '', name: '', last_name: '', email: '', 
                                  id_unidad: 0, id_facultad: 0};
    editName:string = '';
    editLastName:string = '';
    editMail:string = '';
    editUnitNum:any;
    editFacultyNum:any;
    
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
        console.log('Data Received: ' + JSON.stringify(data));
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
        this.toggleCollapse(0);
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

  // Deletes the corresponding element from the list and the database
  deleteUser(user:userData) {
    // console.log('the argument in deleteUnit on the component: '+unit.id_unidad);
    this._userDataService.delete(user._id).subscribe(
      data => {
        //  console.log('Data Sent: ' + data);
         console.log('Kill order executed')
         this.getUsers();
         return true;
       },
       error => {
         console.error('Error deleting User');
         return throwError(error);
       }
     )
  }

  //Changes the information of the marked element on the database before reloading the list.
  editUser() {
    this.buildEdit();
    // console.log('JSON format of the new body to send edits: '+JSON.stringify(this.bodyUnit))
    this._userDataService.edit(this.bodyUser).subscribe(
      data => {
      console.log('Morph order Executed')
      this.getUsers();
      this.markedUser._id = null;
      this.cleanEdit();
      return true;
      },
      error => {
        console.error('Error editing Unit');
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

  //Builds the format for the body data that we're going to send to patch.
  buildEdit() {
    
    this.bodyUser._id = this.markedUser._id;
    
    if(!!this.editName){
      this.bodyUser.name = this.editName;
    } else {
      this.bodyUser.name = this.markedUser.name;
    };

    if(!!this.editLastName){
      this.bodyUser.last_name = this.editLastName;
    } else {
      this.bodyUser.last_name = this.markedUser.last_name;
    };
  
    if(!!this.editMail){
      this.bodyUser.email = this.editMail;
    } else {
      this.bodyUser.email = this.markedUser.email;
    };

    if(!!this.editUnitNum){
      this.bodyUser.id_unidad = this.editUnitNum;
    } else {
      this.bodyUser.id_unidad = this.markedUser.id_unidad;
    };

    if(!!this.editFacultyNum){
      this.bodyUser.id_facultad = this.editFacultyNum;
    } else {
      this.bodyUser.id_facultad = this.markedUser.id_facultad;
    };
  }

  cleanEdit() {
    this.editName = '';
    this.editLastName = '';
    this.editMail = '';
    this.editUnitNum = null;
    this.editFacultyNum = null;
  }

  // Changes the visibility value of elements with a visibility toggle
  toggleCollapse(id: number): void {
    this.visible[id] = !this.visible[id];
  }

}
