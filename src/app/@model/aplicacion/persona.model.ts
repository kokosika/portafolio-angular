import { BaseModel } from './../base.model';
/**
 * Modelo basico de las personas que existen en la aplicacion.
 * Hereda de la clase base model, donde estan los atributos comunes para todas los
 * modelos del sistema (como base.)
 * Servira como mapeo de las respuestas del servidor, tanto json como xml.
 * 
 * @export
 * @class PersonaModel
 * @extends {BaseModel}
 */
export class PersonaModel extends BaseModel {
  /**
   * Atributo que guarda la primera parte del rut
   * 
   * @type {number}
   * @memberof PersonaModel
   */
  public numId: number;
  /**
   * Atributo que almacena el digito verificador
   * 
   * @type {string}
   * @memberof PersonaModel
   */
  public divId: string;
  /**
   * Atributo que guarda el nombre de la persona
   * 
   * @type {string}
   * @memberof PersonaModel
   */
  public nombre: string;
  /**
   * Atributo que guarda el apellido de la persona
   * 
   * @type {string}
   * @memberof PersonaModel
   */
  public apellido: string;
  /**
   * Atributo que guarda la direccion de la persona
   * 
   * @type {string}
   * @memberof PersonaModel
   */
  public direccion: string;
  /**
   * Atributo que guarda el telefono fijo de la persona
   * 
   * @type {number}
   * @memberof PersonaModel
   */
  public telefonoFijo: number;
  /**
   * Atributo que guarda el telefono celular de la persona
   * 
   * @type {number}
   * @memberof PersonaModel
   */
  public telefonoCelular: number;
  /**
   * Atributo que guarda el correo de la persona
   * 
   * @type {string}
   * @memberof PersonaModel
   */
  public correo: string;
  /**
   * Atributo que guarda la fecha de nacimiento de la persona
   * 
   * @type {Date}
   * @memberof PersonaModel
   */
  public fechaNacimiento: Date;
  /**
   * Atributo que guarda el tipo de persona id 
   * 
   * @type {number}
   * @memberof PersonaModel
   */
  public tipoPersonaId: number;
  /**
   * Atributo que guarda la comuna id de la persona
   * 
   * @type {number}
   * @memberof PersonaModel
   */
  public comunaId: number;
  /**
   * Atributo que guarda el estado de la persona id
   * 
   * @type {number}
   * @memberof PersonaModel
   */
  public estadoPersonaId: number;
}
