import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AlertModule,
  AvatarModule,
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CarouselComponent,
  CarouselModule,
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

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    AlertModule,
    ToastModule,
    TooltipModule,
    UtilitiesModule, 
    BadgeModule, 
    CarouselComponent,
    CarouselModule,
    CollapseModule, 
    ModalModule, 
    PopoverModule,
    SharedModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}
