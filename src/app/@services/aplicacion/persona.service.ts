import { ClienteCustomModel } from './../../@model/custom/cliente-custom.model';
import { headers } from './../../app.config';
import { PersonaModel } from './../../@model/aplicacion/persona.model';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs/Observable';
import { GenericResponse } from '../../@model/util/GenericResponse';
import { UsuarioService } from './usuario.service';
import { baseServerUrl } from '../../app.config';


/**
 * Clase que contiene la logica base de la Persona.
 * Esta esta compuesta por la insersion de la persona.
 *
 * @export PersonaService que contiene la logica almacenada para la logica asociada a las personas.
 * @class PersonaService
 * @extends {BaseService} clase base de herencia con metodos POST, GET, PUT y DELETE
 */
@Injectable()
export class PersonaService {
  /**
   * Base de la accion hacia el servidor usuario que se concatena con la url del servidor
   * para realizar llamadas http y obtener recursos.
   *
   * @memberof PersonaService
   */
  private actionUrl = 'persona';

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
   * Crea una instancia de PersonaService.
   * Encargado de la injeccion de dependecias del servicio.
   * Pasa como parametro de herencia el modulo http. que sera utilizado la clase @class BaseService
   *
   * @param {HttpClient} http modulo http client de angular, para realizar peticiones http o ajax
   * hacia el servidor de forma asyc.
   * @memberof UsuarioService
   */
  constructor(private http: HttpClient, private srvUsuario: UsuarioService) {
    this.headers = this.headers.set('Authorization', this.srvUsuario.getToken());
  }

  /**
   * Llamada http de tipo post al servidor a la url /persona.
   * Le envia paramatros al servidor para proceder el enviado de una persona para guardar los
   * datos en el servidor.
   *
   * @param {PersonaModel} persona objecto de tipo persona que sera enviada al servidor para
   * su insersion en la base de datos.
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
   * de respuesta.
   * @memberof PersonaService
   */
  public guardarPersona( persona: PersonaModel ): Observable<HttpResponse<GenericResponse>> {
    return this.http.post<GenericResponse>(this.serverUrl + this.actionUrl, JSON.stringify(persona), {
      observe : 'response', headers: this.headers
    });
  }

  /**
   * Llamada http de tipo put al servidor a la url /persona.
   * Le envia paramatros al servidor para proceder el enviado de una persona para guardar los
   * datos en el servidor.
   *
   * @param {PersonaModel} persona objecto de tipo persona que sera enviada al servidor para
   * su insersion en la base de datos.
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
   * de respuesta.
   * @memberof PersonaService
   */
  public editarPersona( persona: any ): Observable<HttpResponse<GenericResponse>> {
    const personaDto = new PersonaModel();
    personaDto.id = persona.personaId;
    personaDto.numId = persona.numId;
    personaDto.apellido = persona.apellido;
    personaDto.comunaId = persona.comuna.code;
    personaDto.correo = persona.correo;
    personaDto.direccion = persona.direccion;
    personaDto.divId = persona.divId;
    personaDto.estadoPersonaId = persona.estadoPersonaId;
    personaDto.fechaCreacion = persona.fechaCreacion;
    personaDto.fechaNacimiento = persona.fechaNacimiento;
    personaDto.fechaUltimoUpdate = persona.fechaUltimoUpdate;
    personaDto.nombre = persona.nombre;
    personaDto.telefonoCelular = persona.telefonoCelular;
    personaDto.telefonoFijo = persona.telefonoFijo;
    personaDto.tipoPersonaId = persona.tipoPersona;
    personaDto.correo = persona.correo;
    console.log(personaDto);
    return this.http.put<GenericResponse>(this.serverUrl + this.actionUrl, JSON.stringify(personaDto), {
      observe : 'response', headers: this.headers
    });
  }

  /**
   * Llamada http del tipo get al servidor a la url /persona/buscar-persona-por-rut
   * Le envia como parametro al servidor una persona como filtro de consulta.
   * 
   * @param {PersonaModel} obj objecto de tipo persona que sera enviada al servidor
   * como consulta
   * @returns {Observable<HttpResponse<GenericResponse>>} respuesta observable asincrona
   * del servidor almacenada en la clase GenericResponse, donde se almacenara los parametros
   * de respuesta.
   * @memberof PersonaService
   */
  public buscarPersonaPorRut(numId: number, divId: string): Observable<HttpResponse<GenericResponse>> {
    return this.http.get<GenericResponse>(this.serverUrl + this.actionUrl + '/buscar-persona-por-rut', {
      observe: 'response',
      params: { numId: numId.toString() , divId: divId } ,
      headers: this.headers
    });
  }
}
