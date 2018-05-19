import { Component, OnInit } from '@angular/core';

/**
 * Componente encargado de mostrar la barra superior del dashboard.
 * Tiene botones para logout o el perfil para el usuario que se a registrado.
 * 
 * @export
 * @class BarraEstadoComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-barra-estado',
  templateUrl: './barra-estado.component.html',
  styleUrls: ['./barra-estado.component.scss']
})
export class BarraEstadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
