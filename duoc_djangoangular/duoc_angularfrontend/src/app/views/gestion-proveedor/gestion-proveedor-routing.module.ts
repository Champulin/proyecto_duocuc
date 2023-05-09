import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GestionProveedorComponent } from './gestion-proveedor.component';

const routes: Routes = [
    {
        path: '',
        component: GestionProveedorComponent,
        data: {
        title: $localize`Gestion de Proveedores de Telefonia`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionProveedorRoutingModule {
}