import { Component, OnInit } from '@angular/core';

import { pdtData, pdtNew } from 'src/app/models/pdt-model';
import { ProveedorDataService } from 'src/app/services/proveedor-data/proveedor-data.service';

import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-proveedor',
  templateUrl: './gestion-proveedor.component.html',
  styleUrls: ['./gestion-proveedor.component.scss']
})

export class GestionProveedorComponent implements OnInit{

  visible = [false, false];

  selectedPDT: pdtData = {_id: null, id_proveedor:0, nombre_proveedor:'', costo_seg_cel:0, costo_seg_ldi:0, costo_seg_slm:0};
  public markedPDT: pdtData = {_id: null, id_proveedor: 0, nombre_proveedor: '', 
                                costo_seg_cel: 0, costo_seg_ldi: 0, costo_seg_slm: 0};

  //var para guardar lista desde DB
  public pdtList: any;
  
  // variables para crear nuevo objeto en DB
  public newPDT : pdtNew = {id_proveedor: 66, nombre_proveedor: 'placeholder', 
                            costo_seg_cel: 99, costo_seg_ldi: 99, costo_seg_slm:99};
  newPdtID?:any;
  newPdtName:string = '';
  newPdtCEL?:any;
  newPdtLDI?:any;
  newPdtSLM?:any;

  //variables para editar 
  public bodyPDT : pdtData = {_id: '', id_proveedor: 0, nombre_proveedor: 'placeholder', 
                              costo_seg_cel: 0, costo_seg_ldi: 0, costo_seg_slm: 0};
  editPdtName:string = '';
  editPdtCEL?:any;
  editPdtLDI?:any;
  editPdtSLM?:any;

  onSelect(pdt:pdtData): void {
    this.selectedPDT = pdt;
  }

  onMarked(pdt:pdtData): void {
    this.markedPDT = pdt;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  constructor(private _pdtDataService: ProveedorDataService, private router:Router) { }

  public ngOnInit(): void {
    this.getPDT();
  } 

  //Function that retrieves the list of all PDTs from the database.
  getPDT() {
    //Call for the service function list() to retrieve the info for all units in the DB
    this._pdtDataService.list().subscribe(
      data => {
        // If data retrieved exists log it in console for testing and assign it to the local variable that handles it.
        // console.log('Data Received: ' + JSON.stringify(data));
        this.pdtList = data;
      },
      err => console.error(err),
      () => console.log('Providers Loaded')
    );
  }

  // Function sends the compiled new Unit info to the service to create a new unit in the DB
  createPDT() {
    this.savePDT();
    this._pdtDataService.create(this.newPDT).subscribe(
     data => {
        this.getPDT();
        this.toggleCollapse(0);
        return true;
      },
      error => {
        console.error('Error creating Provider');
        return throwError(error);
      }
    )
  }

  // Deletes the corresponding element from the list and the database
  deletePDT(pdt:pdtData) {
    // console.log('the argument in deleteUnit on the component: '+unit.id_unidad);
    this._pdtDataService.delete(pdt.id_proveedor).subscribe(
      data => {
        //  console.log('Data Sent: ' + data);
         console.log('Kill order executed')
         this.getPDT();
         return true;
       },
       error => {
         console.error('Error deleting Provider');
         return throwError(error);
       }
     )
  }

  //Changes the information of the marked element on the database before reloading the list.
  editPDT() {
    this.buildEdit();
    // console.log('JSON format of the new body to send edits: '+JSON.stringify(this.bodyUnit))
    this._pdtDataService.edit(this.bodyPDT).subscribe(
      data => {
      console.log('Morph order Executed')
      this.getPDT();
      this.markedPDT._id = null;
      return true;
      },
      error => {
        console.error('Error editing Provider');
        return throwError(error);
      }
    )
  }

  // Saves input data on a new variable for deletion.
  savePDT() {
    this.newPDT.id_proveedor = this.newPdtID;
    this.newPDT.nombre_proveedor = this.newPdtName;
    this.newPDT.costo_seg_cel = this.newPdtCEL;
    this.newPDT.costo_seg_ldi = this.newPdtLDI;
    this.newPDT.costo_seg_slm = this.newPdtSLM;
  }

  //Builds the format for the body data that we're going to send to patch.
  buildEdit() {

    // _id and the pk id of the model must remain the same, since we are using them
    // to identify what specific table we are altering, hence we take them directly from
    // the marked element
    this.bodyPDT._id = this.markedPDT._id;
    this.bodyPDT.id_proveedor = this.markedPDT.id_proveedor;

    // every other field from the model can be changed or not, so we make sure if the user
    // put a new field in the editing form, if the field exists, we assign it to the body
    // of the edit, if it does not exist, we use the marked element's, which should be identical
    // to the one in the database, remaining unchanged. We do this for every field that can be altered
    if(!!this.editPdtName){
      this.bodyPDT.nombre_proveedor = this.editPdtName;
    } else {
      this.bodyPDT.nombre_proveedor = this.markedPDT.nombre_proveedor;
    };

    if(!!this.editPdtCEL){
      this.bodyPDT.costo_seg_cel = this.editPdtCEL;
    } else {
      this.bodyPDT.costo_seg_cel = this.markedPDT.costo_seg_cel;
    };
  
    if(!!this.editPdtLDI){
      this.bodyPDT.costo_seg_ldi = this.editPdtLDI;
    } else {
      this.bodyPDT.costo_seg_ldi = this.markedPDT.costo_seg_ldi;
    };

    if(!!this.editPdtSLM){
     this.bodyPDT.costo_seg_slm = this.editPdtSLM;
    } else {
     this.bodyPDT.costo_seg_slm = this.markedPDT.costo_seg_slm;
    };

  }

  // Changes the visibility value of elements with a visibility toggle
  toggleCollapse(id: number): void {
    this.visible[id] = !this.visible[id];
  }

}
