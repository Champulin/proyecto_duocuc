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
  ModalModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { CalculoUnidadRoutingModule } from './calculo-unidad-routing.module';
import { CalculoUnidadComponent } from './calculo-unidad.component';

import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    CalculoUnidadRoutingModule,
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
    ModalModule
  ],
  declarations: [CalculoUnidadComponent]
})
export class CalculoUnidadModule {
}