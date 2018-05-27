import { BaseModel } from '../base.model';

/**
 * Modelo basico de los empleados que existen en la aplicacion.
 * Hereda de la clase base model, donde estan los atributos comunes para todas los
 * modelos del sistema (como base.)
 * Servira como mapeo de las respuestas del servidor, tanto json como xml.
 * 
 * @export
 * @class EmpleadoModel
 * @extends {BaseModel}
 */
export class EmpleadoModel extends BaseModel {
   /**
   * Atributo que guarda el estado del empleado id.
   * 
   * @type {number}
   * @memberof EmpleadoModel
   */
  public estadoEmpleadoId: number;

   /**
   * Atributo que guarda el estado del empleado nombre.
   * 
   * @type {string}
   * @memberof EmpleadoModel
   */
  public estadoEmpleadoNombre: string;

   /**
   * Atributo que guarda el tipo del empleado id.
   * 
   * @type {number}
   * @memberof EmpleadoModel
   */
  public tipoEmpleadoId: number;

  /**
   * Atributo que guarda el tipo del empleado nombre.
   * 
   * @type {string}
   * @memberof EmpleadoModel
   */
  public tipoEmpleadoNombre: string;

  /**
   * Atributo que guarda el id de la persona.
   * 
   * @type {number}
   * @memberof EmpleadoModel
   */
  public personaId: number;
  /**
   * Atributo que guarda el id del sucursal.
   * 
   * @type {number}
   * @memberof EmpleadoModel
   */
  public sucursalId: number;

  /**
   * Atributo que guarda el nombre del sucursal.
   * 
   * @type {number}
   * @memberof EmpleadoModel
   */
  public sucursalNombre: string;
  
}
