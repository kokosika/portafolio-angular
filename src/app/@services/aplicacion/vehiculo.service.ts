import { UsuarioService } from './usuario.service';
import { VehiculoModel } from './../../@model/aplicacion/vehiculo.model';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs/Observable';
import { GenericResponse } from '../../@model/util/GenericResponse';
import { baseServerUrl, headers } from '../../app.config';

/**
 * Clase que contiene la logica base de los vehiculos.
 * Esta esta compuesta por el metodo .... para guardar vehiculos.
 * 
 * @export VehiculoService que contiene la logica almacenada para los vehiculos.
 * @class UsuarioService
 * @extends {BaseService} clase base de herencia con metodos POST, GET, PUT y DELETE
 */
@Injectable()
export class VehiculoService {
  /**
   * Base de la accion hacia el servidor vehiculo que se concatena con la url del servidor
   * para realizar llamadas http y obtener recursos.
   * 
   * @memberof VehiculoService
   */
  private actionUrl = 'vehiculo';

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
   * Crea una instancia de VehiculoService.
   * Encargado de la injeccion de dependecias del servicio.
   * Pasa como parametro de herencia el modulo http. que sera utilizado la clase @class BaseService
   * 
   * @param {HttpClient} http modulo http client de angular, para realizar peticiones http o ajax
   * hacia el servidor de forma asyc.
   * @memberof VehiculoService
   */
  constructor(private http: HttpClient, private srvUsuario: UsuarioService) {
    this.headers = this.headers.set('Authorization', this.srvUsuario.getToken());
  }

  /**
   * Llamada http de tipo post al servidor a la url /vehiculo.
   * Le envia paramatros al servidor para proceder con el envio del vehiculo al servidor.
   * 
   * @param {VehiculoModel} obj objeto de tipo VehiculoModel que sera enviado al servidor para
   * su insersion
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros 
   * de respuesta.
   * @memberof VehiculoService
   */
  public guardarVehiculo( vehiculo: VehiculoModel): Observable<HttpResponse<GenericResponse>> {
    return this.http.post<GenericResponse>(this.serverUrl + this.actionUrl, JSON.stringify(vehiculo), {
      observe : 'response',
      headers: this.headers
    });
  }

  /**
   * Llamada http de tipo get al servidor a la url /vehiculo/buscar-por-cliente.
   * Le envia paramatros al servidor para proceder con el envio del vehiculo por cliente seleccionado.
   * 
   * @param {number} clienteId parametro que contiene el id del cliente para buscar los vehiculos
   * asociados.
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros 
   * de respuesta.
   * @memberof VehiculoService
   */
  public buscarVehiculosPorIdCliente (clienteId: number):  Observable<HttpResponse<GenericResponse>> {
    // return this.Get(this.actionUrl + '/buscar-por-cliente', clienteId);
    const data: any =  clienteId;
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl + '/buscar-por-cliente', {
      observe: 'response',
      params: {data} ,
      headers: this.headers
    });
  }
}
