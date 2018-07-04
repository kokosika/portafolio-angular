import { Router } from '@angular/router';
import { GenericResponse } from './../../@model/util/GenericResponse';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../../@model/aplicacion/usuario.model';
import { LoginModel } from '../../@model/aplicacion/login.model';
import { baseServerUrl, headers } from '../../app.config';
/**
 * Clase que contiene la logica base del usuario.
 * Esta esta compuesta por la validacion de login.
 * 
 * @export UsuarioService que contiene la logica almacenada para los usuarios.
 * @class UsuarioService
 * @extends {BaseService} clase base de herencia con metodos POST, GET, PUT y DELETE
 */
@Injectable()
export class UsuarioService {
  /**
   * Base de la accion hacia el servidor usuario que se concatena con la url del servidor
   * para realizar llamadas http y obtener recursos.
   * 
   * @memberof UsuarioService
   */
  private actionUrl = 'usuario';
  protected urlServer = baseServerUrl;
  protected headers: HttpHeaders = headers;

  private token: string;
  private isAuthentication = false;
  private role: string;
  private username: string;

  /**  
   * Crea una instancia de UsuarioService.
   * Encargado de la injeccion de dependecias del servicio.
   * Pasa como parametro de herencia el modulo http. que sera utilizado la clase @class BaseService
   * 
   * @param {HttpClient} http modulo http client de angular, para realizar peticiones http o ajax
   * hacia el servidor de forma asyc.
   * @memberof UsuarioService
   */
  constructor(private http: HttpClient, private route: Router) {
    this.headers = this.headers.set('Authorization', this.getToken());
  }

  /**
   * Llamada http de tipo post al servidor a la url /usuario/validacion-login.
   * Le envia paramatros al servidor para proceder con la validadion del login.
   * 
   * @param {UsuarioModel} obj objeto de tipo UsuarioModel que sera enviado al servidor para
   * su validacion
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros 
   * de respuesta.
   * @memberof UsuarioService
   */
  public validacionLogin( obj: UsuarioModel): void {
    const model = new LoginModel();
    model.username = obj.nombre;
    model.password = obj.contracena;
    this.http.post<HttpResponse<any>>('http://localhost:8081/login', JSON.stringify(model), {
     observe: 'response', headers: this.headers
    }).subscribe( (resp: HttpResponse<any>) => {
      this.token =  resp.headers.get('Authorization').replace('Bearer', '').trim();
      localStorage.setItem('token', this.token);
      this.username = model.username;
      this.validarToken();
      this.redirecLoging();
    });
  }

  private validarToken () {
    if (this.token === null) {
        this.role = '';
        this.username = '';
        this.isAuthentication = false;
    } else {
        this.isAuthentication = true;
    }
}

public isAutenticate(): boolean {
    return this.isAuthentication;
}

public getRole (): string {
    return this.role;
}

public getUsername(): string {
    return this.username;
}

public getToken (): string {
  return localStorage.getItem('token');
}

public redirecLoging () {
    if ( this.isAutenticate() ) {
        this.route.navigate(['/login-bueno']);
    } else {
        this.route.navigate(['/login']);
    }
}

  /**
   * Llamada http de tipo post al servidor a la url /usuario.
   * Le envia paramatros al servidor para proceder con el envio del usuario al servidor.
   * 
   * @param {UsuarioModel} obj objeto de tipo UsuarioModel que sera enviado al servidor para
   * su insersion
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros 
   * de respuesta.
   * @memberof UsuarioService
   */
  public guardarUsuario( obj: UsuarioModel): Observable<HttpResponse<GenericResponse>> {
    return this.http.post<GenericResponse>(this.urlServer + this.actionUrl, JSON.stringify(obj), {
      observe : 'response',
      headers: this.headers
  });
  }

  public resetCuenta (): void {
      this.isAuthentication = false;
      localStorage.clear();
      this.route.navigate(['']);
  }
}
