import { UtilidadService } from './util/utilidad.service';
import { AuthService } from './auth/auth.service';
import { VehiculoService } from './aplicacion/vehiculo.service';
import { PersonaService } from './aplicacion/persona.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './aplicacion/usuario.service';
import { ComboService } from './util/combo.service';
import { ClienteService } from './aplicacion/cliente.service';
import { GuardViewChildrenService } from './auth/guard-view-children.service';
import { GuardViewService } from './auth/guard-view.service';
import { ProveedorService } from './aplicacion/proveedor.service';
import { EmpleadoService } from './aplicacion/empleado.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [
    AuthService,
    GuardViewChildrenService,
    GuardViewService,
    UsuarioService,
    ComboService,
    ClienteService,
    PersonaService,
    VehiculoService,
    UtilidadService,
    ProveedorService,
    EmpleadoService
  ]
})
export class ServicesModule {}
