import { RegistroComponent } from './registro/registro.component';


import { RouterModule } from '@angular/router';
import { NgPrimeModule } from './../ng-prime.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { LoginBuenoComponent } from './login-bueno/login-bueno.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ProductosComponent } from './productos/productos.component';

/**
 * Modulo principal de los componenetes de la aplicacion.
 * Aca se registran todos los componentes creados para el desarrollo de la aplicacion.
 * Se exportara este modulo en el modulo principal de flujo @see AppModule.
 *
 * @export
 * @class CoreModule
 */
@NgModule({
  declarations: [
    CoreComponent,
    HomeComponent,
    LoginComponent,
    PerfilComponent,
    RegistroComponent,
    LogoutComponent,
    LoginBuenoComponent,
    ServiciosComponent,
    ProductosComponent
],
  imports: [
    CommonModule,
    DashboardModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgPrimeModule,
    RouterModule
  ],
  exports: [
    CoreComponent
  ],
  providers: []
})
export class CoreModule {}
