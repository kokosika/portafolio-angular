import { BaseModel } from './../base.model';
/**
 * Modelo basico de los Vechiculos que existen en la aplicacion.
 * Hereda de la clase base model, donde estan los atributos comunes para todas los
 * modelos del sistema (como base.)
 * Servira como mapeo de las respuestas del servidor, tanto json como xml.
 * 
 * @export
 * @class VehiculoModel
 * @extends {BaseModel}
 */
export class VehiculoModel extends BaseModel {
  /**
   * Atributo que guarda la patente del auto.
   * 
   * @type {string}
   * @memberof VehiculoModel
   */
  public patente: string;
  /**
   * Atributo que guarda el tipo de vehiculo id.
   * 
   * @type {number}
   * @memberof VehiculoModel
   */
  public tipoVehiculoId: number;
  /**
   * Atributo que guarda la marta del vehiculo id.
   * 
   * @type {number}
   * @memberof VehiculoModel
   */
  public  marcaVehiculoId: number;
  /**
   * Atributo que guarda el nombre del tipo de vehiculo.
   * 
   * @type {string}
   * @memberof VehiculoModel
   */
  public tipoVehiculoNombre: string;
  /**
   * Atributo que guarda el nombre de la marca del vehiculo.
   * 
   * @type {string}
   * @memberof VehiculoModel
   */
  public marcaVehiculoNombre: string;
  /**
   * Atributo que guarda el cliente asociado al auto.
   * 
   * @type {number}
   * @memberof VehiculoModel
   */
  public clienteId: number;
}
