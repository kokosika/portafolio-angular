import { LoginModel } from './../../@model/aplicacion/login.model';
import { Router } from '@angular/router';
import { UsuarioService } from './../../@services/aplicacion/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../@model/aplicacion/usuario.model';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';


/**
 * Componente del modulo de login.
 * Se gestiona la vista y los eventos.
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * Fecha util para obtener el año para la vista.
   * El elemento es el que sencuentra en la parte baja del html del componente
   * 
   * @type {Date}
   * @memberof LoginComponent
   */
  public test: Date = new Date();

  /**
   * Declaracion del formulario de login
   * 
   * @type {FormGroup}
   * @memberof LoginComponent
   */
  public rFormLogin: FormGroup;

  /**
   * Crea una instancia del componente @type {LoginComponent}.
   * Inicializa la injeccion de dependencias.
   * Crea e inicializa las variables del formulario en null que luego 
   * seran utilizadas en el html como nombre y contracena
   * con validaciones de obligatorio y un maximo de largo de 100.
   * 
   * @param srvUsuario servicio de @type {UsuarioService} que contiene toda la logica 
   * de modulo usuarios.
   * @param fb constructor de formularios de grupo. pertenece al tipo @type {FormBuilder}
   */
  constructor(private srvUsuario: UsuarioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.rFormLogin = this.fb.group({
      nombre: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(0)])
      ],
      contracena: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(3)])
      ]
    });
  }

  /**
   * Es llamado cuando se crea la vista.
   * 
   * @memberof LoginComponent
   */
  ngOnInit() {}

  /**
   * Metodo que valida el ingreso de datos del login.
   * Utiliza un metodo del servicio @type UsuarioService como variable srvUsuario
   * que contiene la llamada http para la validacion del login en el servidor.
   * Si la respuesta es positiva redicciona a otra ruta dependiendo de su rol.
   * Si la respuesta es negativa, lanza una error, el cual es capturado por una mensaje
   * de usuario en el html en forma de creadenciales invalidas
   * 
   * @param {UsuarioModel} obj objecto que contiene los datos del formulario cuando el usuario
   * quiere ingresar sesion en la aplicacion
   * @memberof LoginComponent
   */
  public login(obj: UsuarioModel): void {
    this.srvUsuario.validacionLogin(obj);
  }
}
