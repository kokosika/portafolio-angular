import { BaseModel } from '../base.model';

/**
 * Modelo basico de los proveedores que existen en la aplicacion.
 * Hereda de la clase base model, donde estan los atributos comunes para todas los
 * modelos del sistema (como base.)
 * Servira como mapeo de las respuestas del servidor, tanto json como xml.
 * 
 * @export
 * @class ProveedorModel
 * @extends {BaseModel}
 */
export class ProveedorModel extends BaseModel {

    /**
     * @type {number}
     * @memberof ProveedorModel
     */
    public personaId: number;

    /**
     * 
     * Atributo que almacenara el id del estado del proveedor.
     * 
     * @type {number}
     * @memberof ProveedorModel
     */
    public estadoProveedorId: number;

    /**
     * Atributo que almacenara el nombre del estado del proveedor
     * 
     * @type {string}
     * @memberof ProveedorModel
     */
    public estadoProveedorNombre: string;

    /**
     * 
     * Atributo que almacenara el id del tipo del proveedor.
     * 
     * @type {number}
     * @memberof ProveedorModel
     */
    public tipoProveedorId: number;

    /**
     * Atributo que almacenara el nombre del tipo del proveedor
     * 
     * @type {string}
     * @memberof ProveedorModel
     */
    public tipoProveedorNombre: string;


}
