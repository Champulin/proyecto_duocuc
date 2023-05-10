import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { unitData } from './unit-model';
import { unitList } from './unit-model-detail';
import { UnitDataService } from 'src/app/services/unit-data/unit-data.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-gestion-unidades',
  templateUrl: './gestion-unidades.component.html',
  styleUrls: ['./gestion-unidades.component.scss']
})

export class GestionUnidadesComponent implements OnInit {
  selectedUnit?: unitData;
  listedUnits:any;

  // variable para crear nueva unidad
  public units: any;
  public newUnit: any;

  onSelect(unit:unitData): void {
    this.selectedUnit = unit;
  }

  constructor(private _unitDataService: UnitDataService) { }


  public ngOnInit(): void {
      this.listedUnits = unitList;
      this.getUnits();
  }

  //Function that retrieves the list of Units from the database.
  getUnits() {
    //Call for the service function list() to retrieve the info for all units in the DB
    this._unitDataService.list().subscribe(
      data => {
        // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
        console.log('Data Received: ' + data);
        this.units = data;
      },
      err => console.error(err),
      () => console.log('done loading units')
    );
  }

  // CODE TO CREATE NEW UNIT ENTRY
  createUnits() {
    //sending request to the service with the data for the new unit
    this._unitDataService.create(this.newUnit).subscribe(
     data => {
        //if the data successfully sends then log it and ask for the data from the DB again to refresh tables
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
}

