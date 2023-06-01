import { Component, OnInit } from '@angular/core';

import { accountData } from '../../models/account-model';
import { accountNew } from '../../models/account-new';
import { AccountDataService } from 'src/app/services/account-data/account-data.service';

import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-cuentas',
  templateUrl: './gestion-cuentas.component.html',
  styleUrls: ['./gestion-cuentas.component.scss']
})

export class GestionCuentasComponent implements OnInit{

  visible = [false, false];

  selectedAccount: accountData = {_id: null, id_proveedor: 0, id_facultad: 0, nombre_facultad:'', siglas_facultad: ''};
  public markedAccount: accountData = {_id: null, id_proveedor: 0, id_facultad: 0, nombre_facultad:'', siglas_facultad: ''};

  //var para guardar lista desde DB
  public accounts: any;
  
  // variables para crear nuevo objeto en DB
  public newAccount : accountNew = {id_proveedor: 66, id_facultad: 66, nombre_facultad:'Placeholder', siglas_facultad: 'PHD'};
  newAPro?:any;
  newAFac?:any;
  newAName:string = '';
  newASigla:string = '';

  //variables para editar 
  public bodyAccount : accountData = {_id: '', id_proveedor: 0, id_facultad: 0, 
                                      nombre_facultad:'Placeholder', siglas_facultad: 'PHD'};
  editAPro?:any;
  editAName:string = '';
  editASigla:string = '';

  onSelect(account:accountData): void {
    this.selectedAccount = account;
  }

  onMarked(account:accountData): void {
    this.markedAccount = account;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  constructor(private _accountDataService: AccountDataService, private router:Router) { }

  public ngOnInit(): void {
    this.getAccounts();
  }

  //Function that retrieves the list of Accounts from the database.
  getAccounts() {
    //Call for the service function list() to retrieve the info for all accounts in the DB
    this._accountDataService.list().subscribe(
      data => {
        // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
        // console.log('Data Received: ' + JSON.stringify(data));
        this.accounts = data;
      },
      err => console.error(err),
      () => console.log('Accounts Loaded')
    );
  }

  // Function sends the compiled new account info to the service to create a new account in the DB
  createAccount() {
    this.saveAccount();
    this._accountDataService.create(this.newAccount).subscribe(
     data => {
        // console.log('Data Sent: ' + data);
        console.log('Make order executed')
        this.getAccounts();
        return true;
      },
      error => {
        console.error('Error creating Account');
        return throwError(error);
      }
    )
  }

  // Deletes the corresponding element from the list and the database
  deleteAccount(account:accountData) {
    // console.log('the argument in deleteAccount on the component: '+account.id_facultad);
    this._accountDataService.delete(account.id_facultad).subscribe(
      data => {
        //  console.log('Data Sent: ' + data);
         console.log('Kill order executed')
         this.getAccounts();
         return true;
       },
       error => {
         console.error('Error deleting Account');
         return throwError(error);
       }
     )
  }

  //Changes the information of the marked element on the database before reloading the list.
  editAccount() {
    this.buildEdit();
    // console.log('JSON format of the new body to send edits: '+JSON.stringify(this.bodyAccount))
    this._accountDataService.edit(this.bodyAccount).subscribe(
      data => {
      console.log('Morph order Executed')
      this.getAccounts();
      this.markedAccount._id = null;
      this.cleanEdit();
      return true;
      },
      error => {
        console.error('Error editing Account');
        return throwError(error);
      }
    )
  }

  // Saves input data on a new variable for deletion.
  saveAccount() {
    this.newAccount.id_facultad = this.newAFac;
    this.newAccount.nombre_facultad = this.newAName;
    this.newAccount.siglas_facultad = this.newASigla;
    this.newAccount.id_proveedor = this.newAPro;
  }

  //Builds the format for the body data that we're going to send to patch.
  buildEdit() {
    this.bodyAccount._id = this.markedAccount._id;
    this.bodyAccount.id_facultad = this.markedAccount.id_facultad;

    if(!!this.editAName){
      this.bodyAccount.nombre_facultad = this.editAName;
    } else {
      this.bodyAccount.nombre_facultad = this.markedAccount.nombre_facultad;
    };

    if(!!this.editASigla){
      this.bodyAccount.siglas_facultad = this.editASigla;
    } else {
      this.bodyAccount.siglas_facultad = this.markedAccount.siglas_facultad;
    };
  
    if(!!this.editAPro){
      this.bodyAccount.id_proveedor = this.editAPro;
    } else {
      this.bodyAccount.id_proveedor = this.markedAccount.id_proveedor;
    };
  }

  cleanEdit() {
    this.editAPro = null;
    this.editAName = '';
    this.editASigla = '';
  }

  // Changes the visibility value of elements with a visibility toggle
  toggleCollapse(id: number): void {
    this.visible[id] = !this.visible[id];
  }

}
