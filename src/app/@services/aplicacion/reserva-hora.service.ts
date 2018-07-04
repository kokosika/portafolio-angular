import { ServicioPorDiagnosticoModel } from './../../@model/aplicacion/servicio-por-diagnostico.model';
import { GenericResponse } from './../../@model/util/GenericResponse';
import { Observable } from 'rxjs/Observable';
import { ReservaHoraModel } from './../../@model/aplicacion/reserva-hora.model';
import { UsuarioService } from './usuario.service';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseServerUrl, headers } from '../../app.config';

@Injectable()
export class ReservaHoraService {

  private actionUrl = 'reserva-hora';
  private serverUrl: string = baseServerUrl;
  private headers: HttpHeaders = headers;

  constructor(protected http: HttpClient, protected srvUsuario: UsuarioService) {
    this.headers = this.headers.set('Authorization', this.srvUsuario.getToken());
  }

  public guardarReservaHora(reserva: ReservaHoraModel): Observable<HttpResponse<GenericResponse>> {
    return this.http.post<GenericResponse>(this.serverUrl + this.actionUrl , JSON.stringify(reserva), {
      observe: 'response',
      headers: this.headers
    });
  }

  public guardarServicioPorDiagnostico(servicios: ServicioPorDiagnosticoModel): Observable<HttpResponse<GenericResponse>> {
    return this.http.post<GenericResponse>(this.serverUrl + this.actionUrl + '/servicios-diagnostico' , JSON.stringify(servicios), {
      observe: 'response',
      headers: this.headers
    });
  }

  public getReservasCliente(): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl, {
      observe: 'response',
      params: { nombreUsuario: this.srvUsuario.getUsername() },
      headers: this.headers
    });
  }

  public getDetalleServicio(idDiagnostico: number): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl + '/detalle-servicios', {
      observe: 'response',
      params: { idDiagnostico: idDiagnostico.toString() },
      headers: this.headers
    });
  }
}
