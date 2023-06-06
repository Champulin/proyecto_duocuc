import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProcesoAnexosComponent } from './proceso-anexos.component';

const routes: Routes = [
    {
        path: '',
        component: ProcesoAnexosComponent,
        data: {
        title: $localize`Proceso de Anexos`
        }
    }
];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcesoAnexosRoutingModule {
}