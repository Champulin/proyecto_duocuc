import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  AlertModule,
  AvatarModule,
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  TableModule,
  TabsModule,
  ToastModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { GestionUnidadesRoutingModule } from './gestion-unidades-routing.module';
import { GestionUnidadesComponent } from './gestion-unidades.component';

import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    GestionUnidadesRoutingModule,
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
  declarations: [GestionUnidadesComponent]
})
export class GestionUnidadesModule {
}