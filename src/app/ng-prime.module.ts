import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {SidebarModule} from 'primeng/sidebar';
import {StepsModule} from 'primeng/steps';
import {MenuModule} from 'primeng/menu';
import {ScheduleModule} from 'primeng/schedule';
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
    SidebarModule,
    StepsModule,
    MenuModule,
    ScheduleModule
  ],
  providers: []
})
export class NgPrimeModule {}
