import { ServiciosComponent } from './@core/servicios/servicios.component';
import { AppComponent } from './app.component';
import { PerfilComponent } from './@core/perfil/perfil.component';
import { GuardViewService } from './@services/auth/guard-view.service';
import { RegistroComponent } from './@core/registro/registro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { LoginComponent } from './@core/login/login.component';
import { DashboardComponent } from './@core/dashboard/dashboard.component';
import { componentFactoryName } from '@angular/compiler';
import { ProveedoresComponent } from './@core/dashboard/main/usuarios/proveedores/proveedores.component';
import { ClientesComponent } from './@core/dashboard/main/usuarios/clientes/clientes.component';
import { EmpleadosComponent } from './@core/dashboard/main/usuarios/empleados/empleados.component';
import { UsuariosComponent } from './@core/dashboard/main/usuarios/usuarios.component';
import { LogoutComponent } from './@core/logout/logout.component';
import { LoginBuenoComponent } from './@core/login-bueno/login-bueno.component';
import { ProductosComponent } from './@core/productos/productos.component';
import { ServiciosContratadosComponent } from './servicios-contratados/servicios-contratados.component';

/**
 * constantes de rutas de la aplicacion. 
 * Se vincularan como hijos del panel principal de operaciones
 */
const childrenRoutes: Routes = [
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'empleados', component: EmpleadosComponent}
];

/**
 * constantes de rutas de toda la aplicacion.
 * Aca se crean las rutas de navegacion y su autorizacion por roles de usuario
 * para la seguridad de la misma.
 */
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: ProfileComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'login-bueno', component: LoginBuenoComponent},
  { path: 'servicios', component: ServiciosComponent},
  { path: 'servicios-contratados' , component: ServiciosContratadosComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'panel', component: DashboardComponent, children: childrenRoutes, canActivate: [GuardViewService]},
  { path: 'user-profile', component: ProfileComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'nucleoicons', component: NucleoiconsComponent }
];

/**
 * Modulo principal para la gestion de rutas de la aplicacion.
 * Su funcion es exportar las rutas registradas en el modulo principal de
 * la aplicacion @see AppModule.
 * Para una mejor implementacion en el servidor y seguridad para la navegacion
 * se implemnto la opcion de useHash provista por el core de angular 5.
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: []
})
export class AppRoutingModule {}
