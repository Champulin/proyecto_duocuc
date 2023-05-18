import { Component, OnInit } from '@angular/core';

import { unitData } from '../../models/unit-model';
import { unitNew } from '../../models/unit-new';
import { UnitDataService } from 'src/app/services/unit-data/unit-data.service';

import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-unidades',
  templateUrl: './gestion-unidades.component.html',
  styleUrls: ['./gestion-unidades.component.scss']
})

export class GestionUnidadesComponent implements OnInit {
  
  visible = [false, false];

  selectedUnit?: unitData;
  public markedUnit: unitData = {_id: null, id_unidad: 0, nombre_depto: '', siglas_depto: '', id_facultad: 0};

  //var para guardar lista desde DB
  public units: any;
  
  // variables para crear nuevo objeto en DB
  public newUnit : unitNew = {id_unidad: 66, nombre_depto: 'placeholder', siglas_depto: 'PHR', id_facultad: 99};
  newUID?:any;
  newUNombre:string = '';
  newUSiglas:string = '';
  newUFacultad?:any;

  //variables para editar 
  public bodyUnit : unitData = {_id: '', id_unidad: 0, nombre_depto: 'placeholder', siglas_depto: 'PHR', id_facultad: 0};
  editUNombre:string = '';
  editUSigla:string = '';
  editUFacultad?:any;

  onSelect(unit:unitData): void {
    this.selectedUnit = unit;
  }

  onMarked(unit:unitData): void {
    this.markedUnit = unit;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
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
        // console.log('Data Received: ' + JSON.stringify(data));
        this.units = data;
      },
      err => console.error(err),
      () => console.log('Units Loaded')
    );
  }

  // Function sends the compiled new Unit info to the service to create a new unit in the DB
  createUnit() {
    this.saveUnit();
    this._unitDataService.create(this.newUnit).subscribe(
     data => {
        // console.log('Data Sent: ' + data);
        console.log('Make order executed')
        this.getUnits();
        return true;
      },
      error => {
        console.error('Error creating Unit');
        return throwError(error);
      }
    )
    this.toggleCollapse(0);
  }

  // Deletes the corresponding element from the list and the database
  deleteUnit(unit:unitData) {
    // console.log('the argument in deleteUnit on the component: '+unit.id_unidad);
    this._unitDataService.delete(unit.id_unidad).subscribe(
      data => {
        //  console.log('Data Sent: ' + data);
         console.log('Kill order executed')
         this.getUnits();
         return true;
       },
       error => {
         console.error('Error deleting Unit');
         return throwError(error);
       }
     )
  }

  //Changes the information of the marked element on the database before reloading the list.
  editUnit() {
    this.buildEdit();
    // console.log('JSON format of the new body to send edits: '+JSON.stringify(this.bodyUnit))
    this._unitDataService.edit(this.bodyUnit).subscribe(
      data => {
      console.log('Morph order Executed')
      this.getUnits();
      this.markedUnit._id = null;
      return true;
      },
      error => {
        console.error('Error editing Unit');
        return throwError(error);
      }
    )
  }

  // Saves input data on a new variable for deletion.
  saveUnit() {
    this.newUnit.id_unidad = this.newUID;
    this.newUnit.nombre_depto = this.newUNombre;
    this.newUnit.siglas_depto = this.newUSiglas;
    this.newUnit.id_facultad = this.newUFacultad;
  }

  //Builds the format for the body data that we're going to send to patch.
  buildEdit() {
    this.bodyUnit._id = this.markedUnit._id;
    this.bodyUnit.id_unidad = this.markedUnit.id_unidad;
    if(!!this.editUNombre){
      this.bodyUnit.nombre_depto = this.editUNombre;
    } else {
      this.bodyUnit.nombre_depto = this.markedUnit.nombre_depto;
    };

    if(!!this.editUSigla){
      this.bodyUnit.siglas_depto = this.editUSigla;
    } else {
      this.bodyUnit.siglas_depto = this.markedUnit.siglas_depto;
    };
  
    if(!!this.editUFacultad){
      this.bodyUnit.id_facultad = this.editUFacultad;
    } else {
      this.bodyUnit.id_facultad = this.markedUnit.id_facultad;
    };
  }

  //DEPRECATED Function reloads the route of the element after making changes to the page.
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  // Changes the visibility value of elements with a visibility toggle
  toggleCollapse(id: number): void {
    this.visible[id] = !this.visible[id];
  }
}

