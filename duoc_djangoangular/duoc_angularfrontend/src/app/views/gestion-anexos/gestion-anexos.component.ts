import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  visible = [false, false];
  
  //var para guardar lista desde DB
  public anexos: any;
  public axeID: any;
  public axeName: any;
  public axeFaculty: any;
  public axeUnit: any;

  constructor(private _anexoDataService: AnexoDataService, private router:Router) { }

  public ngOnInit(): void {
    this.getAnexos();
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('id_anexo', this.axeID);
    formData.append('id_facultad', this.axeFaculty); 
    formData.append('id_unidad', this.axeUnit);
    formData.append('nombre_anexo', this.axeName );
    formData.append('file', file);

    this.postAnexos(formData);
    
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

  postAnexos(form:any) {
    this._anexoDataService.uploadAnexo(form).subscribe(
      data => {
        console.log(data)
        console.log('We got a response so thats something')
        this.getAnexos();
      },
      err => {
        console.error(err)
        console.log('Error uploading the file, fuck')
      }  
    )
  }

  toggleCollapse(id: number): void {
    this.visible[id] = !this.visible[id];
  }
}
