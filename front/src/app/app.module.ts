
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginClientComponent } from './client/login-client/login-client.component';
import { FlashMessagesModule } from 'flash-messages-angular';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ProfileClientComponent } from './client/profile-client/profile-client.component';
import { NavBarComponent } from './client/nav-bar/nav-bar.component';
import { ClientsComponent } from './components/clients/clients.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesComponent } from './components/articles/articles.component';
import { FacturesComponent } from './components/factures/factures.component';
import { CoutsComponent } from './components/couts/couts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeesComponent } from './components/employees/employees.component';
import { ListFactureComponent } from './components/list-facture/list-facture.component';
import { ListPromotionsComponent } from './components/list-promotions/list-promotions.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginAdminComponent,
    LoginClientComponent,
    ProfileAdminComponent,
    SidebarComponent,

    ProfileClientComponent,
    NavBarComponent,
    ClientsComponent,
    ArticlesComponent,
    FacturesComponent,
    CoutsComponent,
    EmployeesComponent,
    ListFactureComponent,
    ListPromotionsComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,

    FlashMessagesModule.forRoot(),
     NgbModule,
     BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
