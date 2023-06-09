import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthGuard } from './guards/auth-guard.guard';
import { AdminGate } from './guards/admin-gate.guard'

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'menu-usuario',
        loadChildren: () =>
          import('./views/gestion-usuarios/gestion-usuarios.module').then((m) => m.GestionUsuariosModule),
          canActivate:[AuthGuard, AdminGate]
      },
      {
        path: 'menu-unidades',
        loadChildren: () =>
          import('./views/gestion-unidades/gestion-unidades.module').then((m) => m.GestionUnidadesModule),
          canActivate:[AuthGuard, AdminGate]
      },
      {
        path: 'menu-proveedores',
        loadChildren: () =>
          import('./views/gestion-proveedor/gestion-proveedor.module').then((m) => m.GestionProveedorModule),
          canActivate:[AuthGuard, AdminGate]
      },
      {
        path: 'menu-cuentas',
        loadChildren: () =>
          import('./views/gestion-cuentas/gestion-cuentas.module').then((m) => m.GestionCuentasModule),
          canActivate:[AuthGuard, AdminGate]
      },
      {
        path: 'menu-anexos',
        loadChildren: () =>
          import('./views/gestion-anexos/gestion-anexos.module').then((m) => m.GestionAnexosModule),
          canActivate:[AuthGuard, AdminGate]
      },
      {
        path: 'calculo-unidad',
        loadChildren: () =>
          import('./views/calculo-unidad/calculo-unidad.module').then((m) => m.CalculoUnidadModule),
          canActivate:[AuthGuard, AdminGate]
      },
      {
        path: 'consultas', 
        loadChildren: () =>
          import('./views/consultas/consultas.module').then((m) => m.ConsultasModule),
          canActivate:[AuthGuard]
      },
      {
        path: 'trafico',
        loadChildren: () =>
          import('./views/trafico-llamadas/trafico-llamadas.module').then((m) => m.TraficoLlamadasModule),
          canActivate:[AuthGuard]
      },
      {
        path: 'proceso',
        loadChildren: () =>
          import('./views/proceso-anexos/proceso-anexos.module').then((m) => m.ProcesoAnexosModule),
          canActivate:[AuthGuard]
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },




  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
