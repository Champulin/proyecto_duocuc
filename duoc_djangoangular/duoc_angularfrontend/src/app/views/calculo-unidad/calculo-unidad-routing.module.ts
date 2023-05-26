import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalculoUnidadComponent } from './calculo-unidad.component'

const routes: Routes = [
    {
        path: '',
        component: CalculoUnidadComponent,
        data: {
        title: $localize`Calculo de Unidad`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalculoUnidadRoutingModule {
}