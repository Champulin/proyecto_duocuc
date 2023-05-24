import { Component, OnInit } from '@angular/core';

import { anexoData } from 'src/app/models/anexo-model';
import { AnexoDataService } from 'src/app/services/anexo-data/anexo-data.service';

import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-anexos',
  templateUrl: './gestion-anexos.component.html',
  styleUrls: ['./gestion-anexos.component.scss']
})
export class GestionAnexosComponent implements OnInit {

  //var para guardar lista desde DB
  public anexos: any;

  constructor(private _anexoDataService: AnexoDataService, private router:Router) { }

  public ngOnInit(): void {
    this.getAnexos();
  }

  getAnexos() {
    //Call for the service function list() to retrieve the info for all units in the DB
    this._anexoDataService.list().subscribe(
      data => {
        // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
        // console.log('Data Received: ' + JSON.stringify(data));
        this.anexos = data;
      },
      err => console.error(err),
      () => console.log('Anexos List Loaded')
    );
  }

}
