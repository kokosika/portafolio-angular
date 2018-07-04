import { GenericResponse } from './../../@model/util/GenericResponse';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from './usuario.service';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseServerUrl, headers } from '../../app.config';

@Injectable()
export class ServiciosService {

  private actionUrl = 'servicios';
  private serverUrl: string = baseServerUrl;
  private headers: HttpHeaders = headers;
 
  constructor(protected http: HttpClient, protected srvUsuario: UsuarioService) {
    this.headers = this.headers.set('Authorization', this.srvUsuario.getToken());
  }

  public getTodosLosServicios(): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl , {
      observe: 'response',
      headers: this.headers
    });
  }
}
