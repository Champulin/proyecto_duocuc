import { Component, OnInit } from '@angular/core';
import { unitData } from './unit-model';
import { unitNew } from './unit-new';
import { UnitDataService } from 'src/app/services/unit-data/unit-data.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-unidades',
  templateUrl: './gestion-unidades.component.html',
  styleUrls: ['./gestion-unidades.component.scss']
})

export class GestionUnidadesComponent implements OnInit {
  selectedUnit?: unitData;

  //var para guardar lista desde DB
  public units: any;
  
  // variables para crear nuevo objeto en DB
  public newUnit : unitNew = {id_unidad: 99, nombre_depto: 'placeholder', siglas_depto: 'PHR', id_facultad: 99};
  newUID:number = 99;
  newUNombre:string = '';
  newUSiglas:string = '';
  newUFacultad:number = 99;


  onSelect(unit:unitData): void {
    this.selectedUnit = unit;
  }

  constructor(private _unitDataService: UnitDataService, private router:Router) { }


  public ngOnInit(): void {
      this.getUnits();
  }

  //Function that retrieves the list of Units from the database.
  getUnits() {
    //Call for the service function list() to retrieve the info for all units in the DB
    this._unitDataService.list().subscribe(
      data => {
        // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
        console.log('Data Received: ' + JSON.stringify(data));
        this.units = data;
      },
      err => console.error(err),
      () => console.log('done loading units')
    );
  }

  // CODE TO CREATE NEW UNIT ENTRY
  createUnit() {
    this.saveUnit();
    this._unitDataService.create(this.newUnit).subscribe(
     data => {
        console.log('Data Sent: ' + data);
        this.getUnits();
        return true;
      },
      error => {
        console.error('Error creating Unit');
        return throwError(error);
      }
    )
  }

  // Deletes the corresponding element from the list and the database

  deleteUnit(unit:unitData) {
    console.log('the argument in deleteUnit on the component: '+unit.id_unidad);
    this._unitDataService.delete(unit.id_unidad);
    this.reloadCurrentRoute(); 
  }

  // Guarda los datos del Input en el nuevo objeto
  saveUnit() {
    this.newUnit.id_unidad = this.newUID;
    this.newUnit.nombre_depto = this.newUNombre;
    this.newUnit.siglas_depto = this.newUSiglas;
    this.newUnit.id_facultad = this.newUFacultad;
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}

