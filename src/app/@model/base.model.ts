/**
 * Modelo base de herencia para los modelos del sistema.
 * Esta sujeto a las peticiones enviadas de la base de datos.
 * Servira como parte del mapeo de las respuestas del servidor. como json y xml.
 * 
 * @export
 * @class BaseModel
 */
export class BaseModel {
  /**
   * Almacena el id unico de los modelos 
   * 
   * @type {number}
   * @memberof BaseModel
   */
  public id: number;
  /**
   * Almacena la fecha de creacion de los registros en los modelos.
   * 
   * @type {Date}
   * @memberof BaseModel
   */
  public fechaCreacion: Date;
  /**
   * Almacena la fecha de su ultima actualizacion en los modelos.
   * 
   * @type {Date}
   * @memberof BaseModel
   */
  public fechaUltimoUpdate: Date;
}
