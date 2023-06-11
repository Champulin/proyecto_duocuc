import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
  ModalModule,
  PopoverModule,
  SharedModule,
  ToastModule,
  TooltipModule,
  AlertModule,
  BadgeModule,
  UtilitiesModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { GestionProveedorRoutingModule } from './gestion-proveedor-routing.module';
import { GestionProveedorComponent } from './gestion-proveedor.component'

import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    GestionProveedorRoutingModule,
    AlertModule,
    BadgeModule,
    CardModule,
    CollapseModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    FormsModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    ModalModule,
    PopoverModule,
    SharedModule,
    ToastModule,
    TooltipModule,
    UtilitiesModule
  ],
  declarations: [GestionProveedorComponent]
})
export class GestionProveedorModule {
}