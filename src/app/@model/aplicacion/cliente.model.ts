import { BaseModel } from '../base.model';
/**
 * Modelo basico de los clientes que existen en la aplicacion.
 * Hereda de la clase base model, donde estan los atributos comunes para todas los
 * modelos del sistema (como base.)
 * Servira como mapeo de las respuestas del servidor, tanto json como xml.
 * 
 * @export
 * @class ClienteModel
 * @extends {BaseModel}
 */
export class ClienteModel extends BaseModel {
  /**
   * Atributo que guarda el estado del cliente id.
   * 
   * @type {number}
   * @memberof ClienteModel
   */
  public estadoClienteId: number;
  /**
   * Atributo que guarda el nombre del estado del cliente.
   * 
   * @type {string}
   * @memberof ClienteModel
   */
  public estadoClienteNombre: string;
  /**
   * Atributo que guarda la sucursal id.
   * 
   * @type {number}
   * @memberof ClienteModel
   */
  public sucursalId: number;
  /**
   * Atributo que guarda el nombre del la sucursal.
   * 
   * @type {string}
   * @memberof ClienteModel
   */
  public sucursalNombre: string;
  /**
   * Atributo que guarda el id de la persona asociada a este cliente.
   * 
   * @type {number}
   * @memberof ClienteModel
   */
  public personaId: number;
}
