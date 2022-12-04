import { AdminGuard } from './admin.guard';
import { ListPromotionsComponent } from './components/list-promotions/list-promotions.component';
import { ListFactureComponent } from './components/list-facture/list-facture.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CoutsComponent } from './components/couts/couts.component';
import { FacturesComponent } from './components/factures/factures.component';
import { ArticlesComponent } from './components/articles/articles.component';

import { ClientsComponent } from './components/clients/clients.component';
import { ProfileClientComponent } from './client/profile-client/profile-client.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { LoginClientComponent } from './client/login-client/login-client.component';
import { HomeComponent } from './components/home/home.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGuard } from './client.guard';

const routes: Routes = [
  {path : "EspaceAdmin/login",component:LoginAdminComponent},
  {path : "EspaceClient/login",component:LoginClientComponent},
  {path : "EspaceAdmin/profile",component:ProfileAdminComponent,canActivate:[AdminGuard]},
  {path : "EspaceAdmin/clients",component:ClientsComponent,canActivate:[AdminGuard]},
  {path : "EspaceClient/profile",component:ProfileClientComponent,canActivate:[ClientGuard]},
  {path : "EspaceAdmin/articles",component:ArticlesComponent,canActivate:[AdminGuard]},
  {path : "EspaceAdmin/factures",component:FacturesComponent,canActivate:[AdminGuard]},
  {path : "EspaceAdmin/couts",component:CoutsComponent,canActivate:[AdminGuard]},
  {path : "EspaceAdmin/employees",component:EmployeesComponent,canActivate:[AdminGuard]},
  {path : "EspaceClient/list-facture",component:ListFactureComponent,canActivate:[ClientGuard]},
  {path : "EspaceClient/list-promo",component:ListPromotionsComponent,canActivate:[ClientGuard]},
  {path : "",component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
