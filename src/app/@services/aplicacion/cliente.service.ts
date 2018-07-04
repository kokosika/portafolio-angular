import { baseServerUrl, headers } from './../../app.config';
import { GenericResponse } from './../../@model/util/GenericResponse';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ClienteModel } from '../../@model/aplicacion/cliente.model';
import { UsuarioService } from './usuario.service';
import { ClienteCustomModel } from '../../@model/custom/cliente-custom.model';

/**
 * Clase que contiene la logica base del cliente.
 * Esta esta compuesta por el ingreso de clientes.
 * 
 * @export
 * @class ClienteService que contiene la logica almacenada para los clientes.
 */
@Injectable()
export class ClienteService {
  /**
   * Base de la accion hacia el servidor usuario que se concatena con la url del servidor
   * para realizar llamadas http y obtener recursos.
   * 
   * @private
   * @type {string}
   * @memberof ClienteService
   */
  private actionUrl = 'cliente';

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
   * @memberof ClienteService
   */
  constructor(protected http: HttpClient, protected srvUsuario: UsuarioService) {
    this.headers = this.headers.set('Authorization', this.srvUsuario.getToken());
  }

  /**
   * Llamada http de tipo post al servidor a la url /cliente.
   * Le envia parametros al servidor para realizar acciones
   * 
   * @param {ClienteModel} cliente objecto que se envia al servidor para su insersion
   * en la base de datos.
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros 
   * de respuesta.
   * @memberof ClienteService
   */
  public guardarCliente(cliente: ClienteModel): Observable<HttpResponse<GenericResponse>>   {
    return this.http.post<GenericResponse>(this.serverUrl + this.actionUrl, JSON.stringify(cliente), {
      observe : 'response',
      headers: this.headers
    });
  }

  /**
   * Llamada http de tipo put al servidor a la url /cliente.
   * Le envia parametros al servidor para realizar acciones
   * 
   * @param {ClienteCustomModel} cliente 
   * @returns {Observable<HttpResponse<GenericResponse>>} 
   * @memberof ClienteService
   */
  public editarCliente(cliente: ClienteCustomModel): Observable<HttpResponse<GenericResponse>> {
    const clienteDto = new ClienteModel();
    clienteDto.id = cliente.idCliente;
    clienteDto.personaId = cliente.idPersona;
    clienteDto.estadoClienteId = cliente.estadoClienteId;
    return this.http.put<GenericResponse>(this.serverUrl + this.actionUrl, JSON.stringify(clienteDto), {
      observe : 'response',
      headers: this.headers
    });
  }

  /**
   * Llamada http del tipo get al servidor a la url /cliente/buscar-cliente-por-rut
   * Le envia como parametro al servidor una persona como filtro de consulta.
   * 
   * @param {PersonaModel} obj objecto de tipo persona que sera enviada al servidor
   * como consulta
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
   * de respuesta.
   * @memberof PersonaService
   */
  public buscarClientePorRut(numId: number, divId: string): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl + '/buscar-cliente-por-rut', {
      observe: 'response',
      params: { numId: numId.toString() , divId: divId } ,
      headers: this.headers
    });
  }

  /**
   * Llamada http del tipo get al servidor a la url /cliente
   * Obtiene todos los clientes registrados en la base de datos.
   * 
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
   * de respuesta.
   * @memberof ClienteService
   */
  public obtenerTodosLosClientes(): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl, {
      observe: 'response',
      headers: this.headers
    });
  }

  public buscarClientePorNombre(nombre: string): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl + '/buscar-cliente-por-nombre', {
      observe: 'response',
      params: { nombre: nombre.toString() } ,
      headers: this.headers
    });
  }
}
