import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuGestionUsuariosComponent } from './menu-gestion-usuarios.component' 

const routes: Routes = [
    {
        path: '',
        component: MenuGestionUsuariosComponent,
        data: {
        title: $localize`Gestion de Usuarios`
        }
    }
];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuGestionUsuariosRoutingModule {
}