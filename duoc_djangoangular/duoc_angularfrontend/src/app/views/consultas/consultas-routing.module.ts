import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsultasComponent } from './consultas.component';

const routes: Routes = [
    {
        path: '',
        component: ConsultasComponent,
        data: {
        title: $localize`Menu de Consultas`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsultasRoutingModule {
}