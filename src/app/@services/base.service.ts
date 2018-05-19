import { GenericResponse } from './../@model/util/GenericResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from './aplicacion/usuario.service';
import { baseServerUrl, headers } from '../app.config';

@Injectable()
export class BaseService {
  protected urlServer = baseServerUrl;
  protected headers: HttpHeaders = headers;

  /**
   * Constructor generico para conexiones via ajax.
   * @param http llamada a http angular para conexion via ajax
   */
  constructor(protected http: HttpClient, protected srvUsuario: UsuarioService) {
    this.headers = this.headers.set('Authorization', this.srvUsuario.getToken());
  }


  /**
   * Metodo get Basico para llamadas http.
   * @param urlAccion url de la accion de la api rest
   * @param data parametros de entrada del metodo get, si no tiene ponga null
   */
  protected Get(urlAccion: string, data: any): Observable<HttpResponse<GenericResponse>> {
    if (data == null) {
      return this.http.get<GenericResponse>(this.urlServer + urlAccion, {
        observe: 'response',
        headers: this.headers
      });
    }
    return this.http.get<GenericResponse>(this.urlServer + urlAccion, {
      observe: 'response',
      params: {data} ,
      headers: this.headers
    });
  }

  /**
   * Metodo post basico para llamadas http post.
   * @param urlAccion url de la accion de la api rest
   * @param data parametros de entrada del metodo post
   */
  protected Post(urlAccion: string, data: any): Observable<HttpResponse<GenericResponse>> {
        return this.http.post<GenericResponse>(this.urlServer + urlAccion, JSON.stringify(data), {
            observe : 'response', headers: this.headers
        });
  }

  /**
   * Metodo put basico para llamadas http put
   * @param urlAccion url de la accion de la api rest
   * @param id id del registro que se desea modificar
   * @param data parametros de entrada del metodo put
   */
  protected Put(urlAccion: string, id: any, data: any): Observable<HttpResponse<GenericResponse>> {
      return this.http.put<GenericResponse>(
        this.urlServer + urlAccion,
        JSON.stringify(data),
        { observe : 'response' , params : { id: id } , headers : this.headers});
    }

    /**
     * Metodo delete basico para llamadas http delete
     * @param urlAccion url de la accion de la api rest
     * @param id id del recurso que se desea eliminar
     */
    protected Delete(urlAccion: string, id: any): Observable<HttpResponse<GenericResponse>> {
      return this.http.delete<GenericResponse>(
        this.urlServer + urlAccion,
        { observe: 'response' , params : { id : id}  , headers : this.headers});
    }
}
