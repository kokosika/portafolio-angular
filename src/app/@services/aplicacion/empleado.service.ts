import { Injectable } from '@angular/core';
import { baseServerUrl, headers } from '../../app.config';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs/Observable';
import { GenericResponse } from '../../@model/util/GenericResponse';
import { EmpleadoModel } from '../../@model/aplicacion/empleado.model';
import { EmpleadoCustomModel } from '../../@model/custom/empleado-custom.model';

/**
 * Clase que contiene la logica base del empleado.
 * Esta esta compuesta por el ingreso de empleados.
 * 
 * @export
 * @class EmpleadoService que contiene la logica almacenada para los empleados.
 */
@Injectable()
export class EmpleadoService {

  /**
   * Base de la accion hacia el servidor empleado que se concatena con la url del servidor
   * para realizar llamadas http y obtener recursos.
   * 
   * @private
   * @type {string}
   * @memberof EmpleadoService
   */
  private actionUrl = 'empleado';

  /**
   * Url del server
   * 
   * @private
   * @type {string}
   * @memberof EmpleadoService
   */
  private serverUrl: string = baseServerUrl;

  /**
   * Headers comunes para todas las peticiones.
   * 
   * @private
   * @type {HttpHeaders}
   * @memberof ProveedorService
   */
  private headers: HttpHeaders = headers;

  /**  
   * Crea una instancia de UsuarioService.
   * Encargado de la injeccion de dependecias del servicio.
   * Pasa como parametro de herencia el modulo http. que sera utilizado la clase @class BaseService
   * 
   * @param {HttpClient} http modulo http client de angular, para realizar peticiones http o ajax
   * hacia el servidor de forma asyc.
   * @memberof EmpleadoService
   */
  constructor(protected http: HttpClient, protected srvUsuario: UsuarioService) {
    this.headers = this.headers.set('Authorization', this.srvUsuario.getToken());
  }

  /**
   * 
   * Llamada http de tipo post al servidor a la url /empleado.
   * Le envia parametros al servidor para realizar acciones
   * 
   * @param empleado 
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros 
   * de respuesta.
   * @memberof EmpleadoService
   */
  public guardarEmpleado(empleado: EmpleadoModel): Observable<HttpResponse<GenericResponse>> {
    return this.http.post<GenericResponse>(this.serverUrl + this.actionUrl, JSON.stringify(empleado), {
      observe: 'response',
      headers: this.headers
    });
  }

  /**
  * Llamada http de tipo put al servidor a la url /empleado.
  * Le envia parametros al servidor para realizar acciones
  * 
  * @param {EmpleadoCustomModel} empleado 
  * @returns {Observable<HttpResponse<GenericResponse>>} 
  * @memberof EmpleadoService
  */
  public editarEmpleado(empleado: EmpleadoCustomModel): Observable<HttpResponse<GenericResponse>> {
    const empleadoDto = new EmpleadoModel();
    empleadoDto.id = empleado.empleadoId;
    empleadoDto.personaId = empleado.personaId;
    empleadoDto.estadoEmpleadoId = empleado.estadoEmpleadoId;
    empleadoDto.sucursalId = empleado.sucursalId;
    empleadoDto.tipoEmpleadoId = empleado.tipoEmpleadoId;
    return this.http.put<GenericResponse>(this.serverUrl + this.actionUrl, JSON.stringify(empleadoDto), {
      observe: 'response',
      headers: this.headers
    });
  }

  /**
   * Llamada http del tipo get al servidor a la url /empleado
   * Obtiene todos los empleados registrados en la base de datos.
   * 
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
   * de respuesta.
   * @memberof EmpleadoService
   */
  public obtenerTodosLosEmpleados(): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl, {
      observe: 'response',
      headers: this.headers
    });
  }

}
