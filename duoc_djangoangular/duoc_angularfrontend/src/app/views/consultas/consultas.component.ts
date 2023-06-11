import { Component, Renderer2 ,OnInit } from '@angular/core';

import { ConsultorService } from 'src/app/services/consultor-service/consultor.service';
import { consultaFacultad, consultaUnidad, requestData } from 'src/app/models/consultor-model';

import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {
  private placeName: any;

  public filterList:any[] = [];
  public consultaList:any[] = [];
  public sessionData:any;
  public adminRequest:requestData = {type: 1, id: 1};
  public markedReport: any;
  private downloadBody = {tipo_reporte:"", nombre:"", mes:0, object_id: null };

  visible = [false, false];

  constructor(private _consultorService:ConsultorService, private http:HttpClient, private renderer: Renderer2) { }

  public ngOnInit(): void {
    this.sessionData = localStorage.getItem('sessionUser')
    this.sessionData = JSON.parse(this.sessionData);
    if(this.sessionData.user_type == 'ResponsableUnidad' ){
      this.getResponsable(this.sessionData.id_unidad);
    }else if(this.sessionData.user_type == 'Administrator') {
      this.visible[0] = true;
    }else{
      console.log('SOMETHING HAS GONE TERRIBLE WRONG');
    };
    this._consultorService.emptyFolder();
  }

  onMarked(report:any): void {
    this.markedReport = report;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this._consultorService.emptyFolder().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }

  getResponsable(conID:number) {
    this._consultorService.getConUnidad().subscribe(
    data => {
        // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
        // console.log('Data Received: ' + JSON.stringify(data));
        this.consultaList = [];
        this.consultaList = data;
        // console.log('consultaList: ' + JSON.stringify(this.consultaList[0]));
        this.filterByUnit(conID);
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
    this._consultorService.getConFacultad().subscribe(
      data => {
          // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
          // console.log('Data Received: ' + JSON.stringify(data));
          this.consultaList = [];
          console.log('Pre Data Assign:' + JSON.stringify(this.consultaList))
          this.consultaList = data;
          console.log('Pre Filter:' + JSON.stringify(this.consultaList))
          // console.log('consultaList: ' + JSON.stringify(this.consultaList[0]));
          this.filterByFaculty(conID);
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
      this.getFacultad(request.id);
    }
  }

  downloadReport(report:any){
    if(this.sessionData.user_type == 'ResponsableUnidad' ){
      //console.log('the data im sending to the download functionL:' + JSON.stringify(report))
      this.downloadUser(report);
    }else if(this.sessionData.user_type == 'Administrator') {
      this.downloadAdmin(report);
    }else{
      console.log('SOMETHING HAS GONE TERRIBLE WRONG');
    };
  }

  downloadUser(report:any){
    let Mes = report.fecha_calculo;
    Mes = new Date(Mes);
    this.downloadBody.mes = Mes.getMonth()+1;
    this.downloadBody.tipo_reporte = 'unidad';
    this.downloadBody.nombre = report.nombre_depto;
    this.downloadBody.object_id = report._id ;

    this.downloadCSV();
  }

  downloadAdmin(report:any){

    let Mes = report.fecha_calculo;
    Mes = new Date(Mes);
    this.downloadBody.mes = Mes.getMonth()+1;

    if (report.id_unidad) {
      this.downloadBody.tipo_reporte = "unidad";
      this.downloadBody.nombre = report.nombre_depto;
    } else if (report.id_facultad) {
      this.downloadBody.tipo_reporte = "facultad";
      this.downloadBody.nombre = report.nombre_facultad;
    } else {
      console.log('You ve met with a terrible fate, haven t you?')
    }

    
    this.downloadBody.object_id = report._id ;
    
    this.downloadCSV();
  }

  downloadCSV(): void {
    this.http.post('http://localhost:8000/generar_reporte/', this.downloadBody ,{ responseType: 'blob' }).subscribe(
      (data: Blob) => {
      const csvFile = new Blob([data], { type: 'text/csv' });
      const downloadUrl = URL.createObjectURL(csvFile);
      
      const anchor = this.renderer.createElement('a');
      this.renderer.setAttribute(anchor, 'href', downloadUrl);
      if (this.markedReport.id_unidad){
        this.placeName = this.markedReport.nombre_depto;
      }
      else {
        this.placeName = this.markedReport.nombre_facultad
      }
      let nombreArchivo = 'Reporte_'+ this.placeName + '_' + String(this.markedReport.fecha_calculo);
      this.renderer.setAttribute(anchor, 'download', nombreArchivo);
      this.renderer.setStyle(anchor, 'display', 'none');
      this.renderer.appendChild(document.body, anchor);

      anchor.click();

      this.renderer.removeChild(document.body, anchor);
      URL.revokeObjectURL(downloadUrl);
    });
  }

  // downloadPDF():void{
  //   this.http.get('http://localhost:8000/generar_reporte/', { responseType: 'blob' }).subscribe((data: Blob) => {
  //     const pdfFile = new Blob([data], { type: 'application/pdf' });
  //     const downloadUrl = URL.createObjectURL(pdfFile);

  //     const anchor = document.createElement('a');
  //     anchor.href = downloadUrl;
  //     anchor.download = 'filename.pdf';
  //     anchor.style.display = 'none';
  //     document.body.appendChild(anchor);

  //     anchor.click();

  //     document.body.removeChild(anchor);
  //     URL.revokeObjectURL(downloadUrl);
  //   });
  // }

  filterByUnit(filter:any){
    this.filterList = [];
    for(let i in this.consultaList){
      console.log(JSON.stringify(this.consultaList[i]));
      if(this.consultaList[i].id_unidad==filter){
        this.filterList.push(this.consultaList[i]);
      }
    }
    console.log('Filter after:' + JSON.stringify(this.filterList))
  }

  filterByFaculty(filter:any){
    this.filterList = [];
    for(let i in this.consultaList){
      if(this.consultaList[i].id_facultad==filter){
        this.filterList.push(this.consultaList[i]);
      }
    }
    console.log('Filter after:' + JSON.stringify(this.filterList))
  }

  

}
