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

import { TraficoLlamadasRoutingModule } from './trafico-llamadas-routing.module';
import { TraficoLlamadasComponent } from './trafico-llamadas.component';

import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    AlertModule,
    BadgeModule,
    TraficoLlamadasRoutingModule,
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
  declarations: [TraficoLlamadasComponent]
})
export class TraficoLlamadasModule {
}