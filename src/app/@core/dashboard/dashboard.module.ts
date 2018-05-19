import { RouterModule } from '@angular/router';
import { MainModule } from './main/main.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPrimeModule } from './../../ng-prime.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NavbarDashboardComponent } from './navbar-dashboard/navbar-dashboard.component';
import { AppRoutingModule } from '../../app.routing';


@NgModule({
  declarations: [DashboardComponent, NavbarDashboardComponent],
  imports: [CommonModule, NgPrimeModule, NgbModule.forRoot(), MainModule, RouterModule,
    AppRoutingModule],
  exports: [DashboardComponent],
  providers: []
})
export class DashboardModule {}
