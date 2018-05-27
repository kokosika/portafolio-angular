import { GenericResponse } from './../../@model/util/GenericResponse';
import { UsuarioService } from './../aplicacion/usuario.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseServerUrl, headers } from '../../app.config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UtilidadService {
  /**
   * Base de la accion hacia el servidor usuario que se concatena con la url del servidor
   * para realizar llamadas http y obtener recursos.
   *
   * @memberof ClienteService
   */
  private actionUrl = 'utilidad';

  /**
   * Url del server
   *
   * @private
   * @type {string}
   * @memberof ClienteService
   */
  private serverUrl: string = baseServerUrl;

  /**
   * Headers comunes para todas las peticiones.
   *
   * @private
   * @type {HttpHeaders}
   * @memberof ClienteService
   */
  private headers: HttpHeaders = headers;

  /**
   * Crea una instancia de UsuarioService.
   * Encargado de la injeccion de dependecias del servicio.
   * Pasa como parametro de herencia el modulo http. que sera utilizado la clase @class BaseService
   *
   * @param {HttpClient} http modulo http client de angular, para realizar peticiones http o ajax
   * hacia el servidor de forma asyc.
   * @memberof UtilidadService
   */
  constructor(private http: HttpClient, private srvUsuario: UsuarioService) {
    this.headers = this.headers.set('Authorization', this.srvUsuario.getToken());
  }

  /**
   * Llamada http del tipo get al servidor a la url /utilidad/radio-tipo-cliente
   * 
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
   * de respuesta.
   * @memberof UtilidadService
   */
  public getRadioEstadoCliente(): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl + '/radio-tipo-cliente', {
      observe: 'response',
      headers: this.headers
    });
  }

  /**
   * Llamada http del tipo get al servidor a la url /utilidad/radio-estado-proveedor
   * 
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
   * de respuesta.
   * @memberof UtilidadService
   */
  public getRadioEstadoProveedor(): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl + '/radio-estado-proveedor', {
      observe: 'response',
      headers: this.headers
    });
  }

  /**
   * Llamada http del tipo get al servidor a la url /utilidad/radio-tipo-proveedor
   * 
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
   * de respuesta.
   * @memberof UtilidadService
   */
  public getRadioTipoProveedor(): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl + '/radio-tipo-proveedor', {
      observe: 'response',
      headers: this.headers
    });
  }

  /**
   * Llamada http del tipo get al servidor a la url /utilidad/radio-estado-empleado
   * 
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
   * de respuesta.
   * @memberof UtilidadService
   */
  public getRadioEstadoEmpleado(): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl + '/radio-estado-empleado', {
      observe: 'response',
      headers: this.headers
    });
  }

  /**
   * Llamada http del tipo get al servidor a la url /utilidad/radio-tipo-empleado
   * 
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
   * de respuesta.
   * @memberof UtilidadService
   */
  public getRadioTipoEmpleado(): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl + '/radio-tipo-empleado', {
      observe: 'response',
      headers: this.headers
    });
  }
}
