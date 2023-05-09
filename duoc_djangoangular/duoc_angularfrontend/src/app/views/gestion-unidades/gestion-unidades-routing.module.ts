import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GestionUnidadesComponent } from './gestion-unidades.component'

const routes: Routes = [
    {
        path: '',
        component: GestionUnidadesComponent,
        data: {
        title: $localize`Gestion de Unidades`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionUnidadesRoutingModule {
}