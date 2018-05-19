import { Injectable } from '@angular/core';
import { baseServerUrl, headers } from '../../app.config';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { ProveedorModel } from '../../@model/aplicacion/proveedor.model';
import { Observable } from 'rxjs/Observable';
import { GenericResponse } from '../../@model/util/GenericResponse';
import { ProveedorCustomModel } from '../../@model/custom/proveedor-custom.model';

/**
 * Clase que contiene la logica base del proveedor.
 * Esta esta compuesta por el ingreso de proveedores.
 * 
 * @export
 * @class ProveedorService que contiene la logica almacenada para los proveedores.
 */
@Injectable()
export class ProveedorService {

    /**
     * Base de la accion hacia el servidor usuario que se concatena con la url del servidor
     * para realizar llamadas http y obtener recursos.
     * 
     * @private
     * @type {string}
     * @memberof ProveedorService
     */
    private actionUrl = 'proveedor';

    /**
     * Url del server
     * 
     * @private
     * @type {string}
     * @memberof ProveedorService
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
     * @memberof ProveedorService
     */
    constructor(protected http: HttpClient, protected srvUsuario: UsuarioService) {
        this.headers = this.headers.set('Authorization', this.srvUsuario.getToken());
    }

    /**
     * 
     * Llamada http de tipo post al servidor a la url /proveedor.
     * Le envia parametros al servidor para realizar acciones
     * 
     * @param proveedor 
     * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
     * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros 
     * de respuesta.
     * @memberof ProveedorService
     */
    public guardarProveedor(proveedor: ProveedorModel): Observable<HttpResponse<GenericResponse>>  {
        return this.http.post<GenericResponse>(this.serverUrl + this.actionUrl, JSON.stringify(proveedor), {
            observe : 'response',
            headers: this.headers
        });
    }

    /**
   * Llamada http de tipo put al servidor a la url /proveedor.
   * Le envia parametros al servidor para realizar acciones
   * 
   * @param {ClienteCustomModel} cliente 
   * @returns {Observable<HttpResponse<GenericResponse>>} 
   * @memberof ClienteService
   */
  public editarProveedor(proveedor: ProveedorCustomModel): Observable<HttpResponse<GenericResponse>> {
    const proveedorDto = new ProveedorModel();
    proveedorDto.id = proveedor.proveedorId;
    proveedorDto.personaId = proveedor.personaId;
    proveedorDto.estadoProveedorId = proveedor.estadoProveedorId;
    return this.http.put<GenericResponse>(this.serverUrl + this.actionUrl, JSON.stringify(proveedorDto), {
      observe : 'response',
      headers: this.headers
    });
  }

    /**
     * Llamada http del tipo get al servidor a la url /proveedor
     * Obtiene todos los proveedores registrados en la base de datos.
     * 
     * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
     * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
     * de respuesta.
     * @memberof ProveedorService
     */
    public obtenerTodosLosProveedores(): Observable<HttpResponse<GenericResponse>> {
        return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl, {
        observe: 'response',
        headers: this.headers
    });
  }

}
