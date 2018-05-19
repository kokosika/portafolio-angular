import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {SidebarModule} from 'primeng/sidebar';
/**
 * Modulo principal de exportacion de los componentes de la libreria NgPrime.
 * Aca se listaran todos los componentes utilizados por la aplicacion.
 * Se utilizara como via de exportacion hacia el modulo principal de la aplicacion @see AppModule.
 *
 * @export
 * @class NgPrimeModule
 */
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    SidebarModule
  ],
  providers: []
})
export class NgPrimeModule {}
