import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  ModalModule,
  NavModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';

// import services
import { AccountDataService } from './services/account-data/account-data.service';
import { AnexoDataService } from './services/anexo-data/anexo-data.service';
import { ProveedorDataService } from './services/proveedor-data/proveedor-data.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { UnitDataService } from 'src/app/services/unit-data/unit-data.service';
import { LoginService } from './services/login-service/login-service.service';
import { AuthService } from './services/auth-service/auth-service.service';
import { ReportService } from './services/report-service/report.service';
import { ConsultorService } from './services/consultor-service/consultor.service';
import { UnitListPipe} from './unit-list.pipe';
import { FacultyListPipe } from './faculty-list.pipe';
import { ProviderListPipe } from './provider-list.pipe';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, UnitListPipe, FacultyListPipe, ProviderListPipe],
  imports: [
    FormModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    CarouselModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    HttpClientModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    FormModule,
    FormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    HttpClientModule,
    ModalModule,
    PopoverModule,
    TooltipModule,
    CommonModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy ,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title,
    UserDataService,
    ReportService,
    UnitDataService,
    LoginService,
    AuthService,
    AccountDataService,
    ProveedorDataService,
    AnexoDataService,
    ConsultorService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
