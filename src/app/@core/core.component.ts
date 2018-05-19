import { Component, OnInit } from '@angular/core';

/**
 * Componente padre de los componentes de la aplicacion.
 * Sirve como transito en el enrutamiento de la aplicacion o como contendor de los componentes hijos.
 * No recive una funcionalidad como componente funcional.
 * 
 * @export
 * @class CoreComponent
 * @implements {OnInit}
 */
@Component({
      moduleId: module.id,
      selector: 'app-core',
      templateUrl: './core.component.html'
})

export class CoreComponent implements OnInit {
      constructor() { }

      ngOnInit() { }
}
