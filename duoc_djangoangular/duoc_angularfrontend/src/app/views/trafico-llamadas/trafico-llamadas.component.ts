import { Component, OnInit } from '@angular/core';

//Here go any other imports that need to be made
import { ConsultorService } from 'src/app/services/consultor-service/consultor.service';
import { requestTrafico, traficoData } from 'src/app/models/consultor-model';

import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trafico-llamadas',
  templateUrl: './trafico-llamadas.component.html',
  styleUrls: ['./trafico-llamadas.component.scss']
})
export class TraficoLlamadasComponent {

  public request:requestTrafico = {nombre_proveedor: "", mes: 0}; 
  public traficoList:any[] = [];
  public reqDone:any;

  public constructor(private _consultorService: ConsultorService, private router: Router) {}

  public ngOnInit(): void {
    this.reqDone=null;
  }

  getTrafico(req:requestTrafico) {
    this._consultorService.getTrafico(req).subscribe(
      data => {
        // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
        this.traficoList=[];
        this.traficoList.push(data);
        this.reqDone = this.request;
      },
      err => console.error(err),
      () => console.log('Traffic Data Loaded')
    );
  }
}
