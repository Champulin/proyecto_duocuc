import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TraficoLlamadasComponent } from './trafico-llamadas.component';

const routes: Routes = [
    {
        path: '',
        component: TraficoLlamadasComponent,
        data: {
        title: $localize`Trafico de Llamadas`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TraficoLlamadasRoutingModule {
}