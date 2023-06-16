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
  success_alert = false;
  error_alert = false;
  mensaje_error = '';
  public response_message: string = "";
  //var para guardar lista desde DB
  public anexos: any;
  public axeID: any;
  public axeName: any;
  public axeFaculty: any;
  public axeUnit: any;
  //initialize a void FIle object
  public file: File = new File([], '');
  //initialize a void FormData object
  public formData: FormData = new FormData();

  constructor(private _anexoDataService: AnexoDataService, private router:Router) { }

  public ngOnInit(): void {
    this.getAnexos();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  successAlert() {
    this.success_alert=true;
    //alert("Anexo agregado con éxito");
  }
  errorAlert(mensaje: string) {
    this.error_alert=true;
    this.mensaje_error=mensaje;
    //alert("Error al agregar anexo");
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
  insertAnexo() {
    const formData:FormData = new FormData();
    formData.append('id_anexo', this.axeID);
    formData.append('id_facultad', this.axeFaculty);
    formData.append('id_unidad', this.axeUnit);
    formData.append('nombre_anexo', this.axeName );
    formData.append('file', this.file);
    this.success_alert=false;
    this.error_alert=false;
    this.postAnexos(formData);
  }
  postAnexos(form:any) {
    this._anexoDataService.uploadAnexo(form).subscribe(
      data => {
        this.successAlert();
        this.getAnexos();
      },
      err => {
        this.response_message = JSON.stringify(err.error.message);
        this.errorAlert(this.response_message);
        //reset form data after error
        this.axeID = '';
        this.axeFaculty = '';
        this.axeUnit = '';
        this.axeName = '';
        this.file = new File([], '');
      }  
    )
  }
  toggleCollapse(id: number): void {
    this.visible[id] = !this.visible[id];
  }

}
