import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GestionAnexosComponent } from './gestion-anexos.component';

const routes: Routes = [
    {
        path: '',
        component: GestionAnexosComponent,
        data: {
        title: $localize`Gestion de Anexos`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionAnexosRoutingModule {
}