import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnexoDataService } from 'src/app/services/anexo-data/anexo-data.service';
import { ReportService } from 'src/app/services/report-service/report.service';

import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proceso-anexos',
  templateUrl: './proceso-anexos.component.html',
  styleUrls: ['./proceso-anexos.component.scss']
})

export class ProcesoAnexosComponent implements OnInit {

  visible = [false, false];
  public anexos: any;
  public facultyRequest:any = {id_facultad:0, mes:0}
  public newOrder:any = {id_anexo:0}

  btnRadioGroup = this.formBuilder.group({
    radio1: this.formBuilder.control({ value: 'Radio2' })
  });

  constructor(private http:HttpClient, private _anexoDataService: AnexoDataService, private formBuilder: UntypedFormBuilder) {}

  public ngOnInit() {
    this.getAnexos();
    this.setRadioValue('Radio1');
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
    console.log(this.newOrder);
    this.runUnit(this.newOrder);
  }

  calculateFacultyOrder(request:any){
    console.log(request.mes)
    this.runFaculty(request);
  }

  runUnit(anexoForm:any) {
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    let body = anexoForm;
    
    let postOrder = 'http://localhost:8000/calculo_unidad/';
    console.log('In Service Body: ' + body)
    console.log('In Service URL:' + postOrder)
    console.log('I went inside the RUN UNIT')
    this.http.post(postOrder, JSON.stringify(body), httpOptions).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  } 

  runFaculty(body:any){
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json' ,
      })
    };
    let postOrder = 'http://localhost:8000/calculo_general/';
    console.log('I went inside the RUN')
    return this.http.post(postOrder, JSON.stringify(body), httpOptions).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }



  setRadioValue(value: string): void {
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

}
