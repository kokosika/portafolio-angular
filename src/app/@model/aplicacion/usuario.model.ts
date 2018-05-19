import { BaseModel } from '../base.model';
/**
 * Modelo basico de los usuarios que existen en la aplicacion.
 * Hereda de la clase base model, donde estan los atributos comunes para todas los
 * modelos del sistema (como base.)
 * Servira como mapeo de las respuestas del servidor, tanto json como xml.
 * 
 * @export
 * @class UsuarioModel
 * @extends {BaseModel}
 */
export class UsuarioModel extends BaseModel {
  /**
   * Almacena el nombre de usuario.
   * 
   * @type {string}
   * @memberof UsuarioModel
   */
  public nombre: string;
  /**
   * Almacena la contraceña del usuario.
   * 
   * @type {string}
   * @memberof UsuarioModel
   */
  public contracena: string;
  /**
   * Almacena el id foraneo de los tipos de usuario.
   * 
   * @type {number}
   * @memberof UsuarioModel
   */
  public tipoUsuarioId: number;
  /**
   * Almacena el id foraneo de los estados del usuario.
   * 
   * @type {number}
   * @memberof UsuarioModel
   */
  public estadoUsuarioId: number;
  /**
   * Almacena el id foraneo de la persona asociada.
   * 
   * @type {number}
   * @memberof UsuarioModel
   */
  public personaId: number;
  /**
   * Almacena el nombre del tipo de usuario como anexo al modelo.
   * 
   * @type {string}
   * @memberof UsuarioModel
   */
  public tipoUsuarioNombre: string;
  /**
   * Almacena el nombre del estado de usuario como anexo al modelo.
   * 
   * @type {string}
   * @memberof UsuarioModel
   */
  public estadoUsuarioNombre: string;

  /**
   * Alamacena el id de la sucursal a la cual fue asociado el usuario.
   * 
   * @type {string}
   * @memberof UsuarioModel
   */
  public sucursalId: number;
  /**
   * Almacena el nombre de la sucursal a la cual fue asociado el usuario.
   * 
   * @type {string}
   * @memberof UsuarioModel
   */
  public sucursalNombre: string;
}
