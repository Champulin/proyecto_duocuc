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

import { ProcesoAnexosComponent } from './proceso-anexos.component';
import { ProcesoAnexosRoutingModule} from './proceso-anexos-routing.module';

import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    ProcesoAnexosRoutingModule,
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
    AlertModule,
    BadgeModule,
    SharedModule,
    ToastModule,
    TooltipModule,
    UtilitiesModule,
    PopoverModule,
    ModalModule
  ],
  declarations: [ProcesoAnexosComponent]
})
export class ProcesoAnexosModule {
}
