import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnexoDataService } from 'src/app/services/anexo-data/anexo-data.service';
import { UnitDataService } from 'src/app/services/unit-data/unit-data.service';

import { DatePipe } from '@angular/common';

import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proceso-anexos',
  templateUrl: './proceso-anexos.component.html',
  styleUrls: ['./proceso-anexos.component.scss']
})

export class ProcesoAnexosComponent implements OnInit {

  visible = [false, false];

  public success_alert = false;
  public error_alert = false;
  public mensaje_error = '';
  public response_message: string = "";


  public anexos: any;
  public facultyRequest:any = {id_facultad:0, mes:0}
  public newOrder:any = {id_anexo:0}
  public noteBody:any = {id_unidad:0, estado: false, cuerpo:'', titulo: ''};
  public markedCalculus: any;
  public unitRequestMes: any = 0;
  private lastMarked:any;

  btnRadioGroup = this.formBuilder.group({
    radio1: this.formBuilder.control({ value: 'Radio2' })
  });

  constructor(private _unitService:UnitDataService, private http:HttpClient, private _anexoDataService: AnexoDataService, private formBuilder: UntypedFormBuilder) {}

  public ngOnInit() {
    this.getAnexos();
    this.setRadioValue('Radio1');
  }

  onMarked(calc: any): void {
    this.markedCalculus = calc;
    this.success_alert=false;
    this.error_alert=false;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
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

  calculateUnitOrder(request:any){
    this.newOrder.id_anexo = request.id_anexo;
    this.lastMarked = request;
    console.log(this.newOrder);
    this.runUnit(this.newOrder);
  }

  calculateFacultyOrder(request:any){
    console.log(request.mes)
    this.runFaculty(request);
  }

  runUnit(anexoForm:any) {
    this.success_alert=false;
    this.error_alert=false;
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    let body = anexoForm;
    body.mes = this.unitRequestMes;

    console.log(JSON.stringify(body))
    
    let postOrder = 'http://localhost:8000/calculo_unidad/';
    this.http.post(postOrder, JSON.stringify(body), httpOptions).subscribe(
      response => {
        console.log(response);
        this.successAlert();
        this.createNote();
      },
      err => {
        this.response_message = JSON.stringify(err.error.message);
        this.errorAlert(this.response_message);
        console.error(err);
      }
    );
  } 

  runFaculty(body:any){
    this.success_alert=false;
    this.error_alert=false;
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    let postOrder = 'http://localhost:8000/calculo_general/';
    console.log('I went inside the RUN')
    return this.http.post(postOrder, JSON.stringify(body), httpOptions).subscribe(
      response => {
        this.successAlert();
        console.log(response);
      },
      err => {
        this.response_message = JSON.stringify(err.error.message);
        this.errorAlert(this.response_message);
        console.error(err);
      }
    );
  }

  createNote(){
    this.noteBody.id_unidad = this.lastMarked.id_unidad
    this.noteBody.estado = false;

    this._unitService.getUnit(this.noteBody.id_unidad).subscribe(
      data => {
        this.noteBody.titulo = 'Nuevo Calculo de '+ data.nombre_depto;
        let today = new Date();
        let pipe = new DatePipe('en-US');
        let bodyDate = pipe.transform(today, 'dd/MM/YYYY')
        this.noteBody.cuerpo = ''+bodyDate+' - Existen nuevos calculos de tarificacion mensuales para la Unidad de '+data.nombre_depto;
        console.log(JSON.stringify(this.noteBody))
        this.sendNote();
      }, error => {
        console.log(error)
      }
    );
    
  }

  sendNote(){
    this._anexoDataService.sendNote(this.noteBody).subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.error(error)
      }
    );
  }


  setRadioValue(value: string): void {
    this.success_alert=false;
    this.error_alert=false;
    this.btnRadioGroup.setValue({ radio1: value });
    console.log(this.btnRadioGroup.value)
    if (this.btnRadioGroup.value.radio1 == 'Radio1') {
      console.log('Unidad Visible')
      this.visible[1] = false;
      this.toggleCollapse(0);
    } else if (this.btnRadioGroup.value.radio1 == 'Radio2'){
      console.log('Facultad Visible')
      this.visible[0] = false;
      this.toggleCollapse(1);
    } else {
      console.log('You ve met with a terrible fate, haven t you?')
    }
  }

  toggleCollapse(id: number): void {
    this.visible[id] = !this.visible[id];
  }

  successAlert() {
    this.success_alert=true;
    //alert("Anexo agregado con éxito");
  }

  errorAlert(mensaje: string) {
    this.error_alert = true;
    this.mensaje_error = mensaje;
    //alert("Error al agregar anexo");
  }
  
}
