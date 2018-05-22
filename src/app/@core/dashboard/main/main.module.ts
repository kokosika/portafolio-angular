import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPrimeModule } from './../../../ng-prime.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { AppRoutingModule } from '../../../app.routing';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProveedoresComponent } from './usuarios/proveedores/proveedores.component';
import { ClientesComponent } from './usuarios/clientes/clientes.component';
import { BarraEstadoComponent } from './barra-estado/barra-estado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosComponent } from './usuarios/empleados/empleados.component';
import { ServiciosComponent } from './servicios/servicios.component';

@NgModule({
  declarations: [
    MainComponent,
    UsuariosComponent,
    ProveedoresComponent,
    ClientesComponent,
    BarraEstadoComponent,
    EmpleadosComponent,
    ServiciosComponent
],
  imports: [
    CommonModule,
    NgPrimeModule,
    NgbModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MainComponent],
  providers: [],
})
export class MainModule {}
