import { Component, OnInit } from '@angular/core';

import { ConsultorService } from 'src/app/services/consultor-service/consultor.service';
import { consultaFacultad, consultaUnidad, requestData } from 'src/app/models/consultor-model';

import { throwError } from 'rxjs';


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {

  
  public consultaList:any[] = [];
  public sessionData:any;
  public adminRequest:requestData = {type: 1, id: 1};

  visible = [false, false];

  constructor(private _consultorService:ConsultorService) { }

  public ngOnInit(): void {
    this.sessionData = localStorage.getItem('sessionUser')
    this.sessionData = JSON.parse(this.sessionData);
    if(this.sessionData.user_type == 'ResponsableUnidad' ){
      this.getResponsable(this.sessionData.id_unidad);
    }else if(this.sessionData.user_type == 'Administrator') {
      this.visible[0] = true;
      console.log('identified as admin');
    }else{
      console.log('SOMETHING HAS GONE TERRIBLE WRONG');
    };
  }

  getResponsable(conID:number) {
    this._consultorService.getConUnidad(conID).subscribe(
    data => {
        // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
        // console.log('Data Received: ' + JSON.stringify(data));
        this.consultaList=[];
        this.consultaList.push(data);
        // console.log('consultaList: ' + JSON.stringify(this.consultaList[0]));
      },
      err => {
        console.error(err)
        // TODO: Create an alert on this spot that displays when the request comes back empty. (code in this spot is
        // only executed when the request is empty already.)
      },
      () => console.log('getConsultas completed')
    );
  }

  getFacultad(conID:number) {
    this._consultorService.getConFacultad(conID).subscribe(
      data => {
          // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
          // console.log('Data Received: ' + JSON.stringify(data));
          this.consultaList=[];
          this.consultaList.push(data);
          // console.log('consultaList: ' + JSON.stringify(this.consultaList[0]));
        },
        err => {
          console.error(err)
          // TODO: Create an alert on this spot that displays when the request comes back empty. (code in this spot is
          // only executed when the request is empty already.)
        },
        () => console.log('getConsultas completed')
      );
  }

  getForAdmin(request:requestData) {
    if (request.type == 1) {
      this.getResponsable(request.id);
    } else if (request.type == 2) {
      this.getFacultad(request.id)
    }
  }

}
