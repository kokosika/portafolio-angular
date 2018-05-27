import { ComboModel } from './../../@model/util/combo.model';
import { GenericResponse } from './../../@model/util/GenericResponse';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../aplicacion/usuario.service';

/**
 * Base de la accion hacia el servidor combos que se concatena con la url del servidor
 * para realizar llamadas http y obtener recursos.
 *
 * @export ComboService ue contiene la logica almacenada para los combos.
 * @class ComboService
 * @extends {BaseService} Clase base de herencia con metodos POST, GET, PUT y DELETE
 */
@Injectable()
export class ComboService extends BaseService {

  /**
   * Base de la accion hacia el servidor combo que se concatena con la url del servidor
   * para realizar llamadas http y obtener recursos.
   * 
   * @private
   * @memberof ComboService
   */
  private actionUrl = 'combo';

  /**
   * Crea una instancia de UsuarioService.
   * Encargado de la injeccion de dependecias del servicio.
   * Pasa como parametro de herencia el modulo http. que sera utilizado la clase @class BaseService
   * 
   * @param {HttpClient} http modulo http client de angular, para realizar peticiones http o ajax
   * hacia el servidor de forma asyc.
   * @memberof ComboService
   */
  constructor(protected http: HttpClient, protected srvUsuario: UsuarioService) {
        super(http, srvUsuario);
        this.headers.set('Authorization', this.srvUsuario.getToken());
  }

  /**
   * Llamada http de tipo post al servidor a la url /combo/pais
   * 
   * 
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los 
   * parametros de respuesta.
   * @memberof ComboService
   */
  public getComboPais(): Observable<HttpResponse<GenericResponse>> {
    return this.Post(this.actionUrl + '/pais' , null);
  }
  /**
   * Llamada http de tipo post al servidor a la url /combo/region
   * 
   * @param {ComboModel} obj objecto de tipo comboModel, donde se enviara como parametro
   * el code.
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los 
   * parametros de respuesta.
   * @memberof ComboService
   */
  public getComboRegion(obj: ComboModel): Observable<HttpResponse<GenericResponse>> {
    return this.Post(this.actionUrl + '/region', obj);
  }

  /**
   * Llamada http de tipo post al servidor a la url /combo/provincia
   * 
   * @param {ComboModel} obj objecto de tipo comboModel, donde se enviara como parametro
   * el code.
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los 
   * parametros de respuesta.
   * @memberof ComboService
   */
  public getComboProvincia(obj: ComboModel): Observable<HttpResponse<GenericResponse>> {
    return this.Post(this.actionUrl + '/provincia', obj);
  }

  /**
   * Llamada http de tipo post al servidor a la url /combo/comuna
   * 
   * @param {ComboModel} obj objecto de tipo comboModel, donde se enviara como parametro
   * el code.
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los 
   * parametros de respuesta.
   * @memberof ComboService
   */
  public getComboComuna(obj: ComboModel): Observable<HttpResponse<GenericResponse>> {
    return this.Post(this.actionUrl + '/comuna', obj);
  }

  /**
   * Llamada http de tipo post al servidor a la url /combo/marca
   * 
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los 
   * parametros de respuesta.
   * @memberof ComboService
   */
  public getComboMarca(): Observable<HttpResponse<GenericResponse>> {
    return this.Post(this.actionUrl + '/marca', null);
  }

  /**
   * Llamada http de tipo post al servidor a la url /combo/modelo
   * 
   * @param {ComboModel} obj objecto de tipo comboModel, donde se enviara como parametro
   * el code.
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los 
   * parametros de respuesta.
   * @memberof ComboService
   */
  public getComboModelo(obj: ComboModel): Observable<HttpResponse<GenericResponse>> {
    return this.Post(this.actionUrl + '/modelo', obj);
  }

  /**
   * Llamada http de tipo post al servidor a la url /combo/sucursal
   * 
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona 
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los 
   * parametros de respuesta.
   * @memberof ComboService
   */
  public getComboSucursal(): Observable<HttpResponse<GenericResponse>> {
    return this.Post(this.actionUrl + '/sucursal', null);
  }
}
