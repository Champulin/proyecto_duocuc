import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GestionUsuariosComponent } from './gestion-usuarios.component' 

const routes: Routes = [
    {
        path: '',
        component: GestionUsuariosComponent,
        data: {
        title: $localize`Gestion de Usuarios`
        }
    }
];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionUsuariosRoutingModule {
}