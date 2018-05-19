/**
 * Contiene el modelo completo del cliente para obtener y mapear todos los
 * datos que envie el servidor del cliente para mostrarlos en forma de tabla.
 * Incluye datos de personas asociadas al cliente.
 * 
 * @export
 * @class ClienteCustomModel
 */
export class ClienteCustomModel {

    /**
     * Variable que almacena el id de la persona
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public idPersona: number;

    /**
     * Variable que almacena el apellido de la persona
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public apellido: string;

    /**
     * Variable que almacena el correo de la persona.
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public correo: string;

    /**
     * Variable que almacena la direccion de la persona.
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public direccion: string;

    /**
     * Variable que almacena el rut de la persona.
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public rut: string;

    /**
     * Variable que almacena el nombre de la persona.
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public nombre: string;

    /**
     * Variable que almacena el telefono celular de la persona.
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public telefonoCelular: number;

    /**
     * Varibale que almacena el telefono fijo de la persona.
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public telefonoFijo: number;

    /**
     * Variable que almacena el id del pais.
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public paisId: number;
    /**
     * Variable que almacena el nombre del pais.
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public paisNombre: string;
    /**
     * Variable que almacena el id de la region.
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public regionId: number;
    /**
     * Variable que almacena el nombre de la region.
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public regionNombre: string;
    /**
     * Variable que almacena id de la provincia.
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public provinciaId: number;
    /**
     * Variable que almacena el nombre de la provincia.
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public provinciaNombre: string;
    /**
     * Variable que almacena el id de la comuna
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public comunaId: number;

    /**
     * Variable que almacena el nombre de la comuna
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public comunaNombre: string;

    /**
     * Variable que almacena el estado de la persona id
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public estadoPersonaId: number;

    /**
     * Variable que almacena el nombre del estado de la persona
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public estadoPersonaNombre: string;

    /**
     * Variable que almacena el id del tipo de persona
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public tipoPersonaId: number;

    /**
     * Variable que almacena el nombre del tipo de persona
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public tipoPersonaNombre: string;

    /**
     * Variable que almacena el id del cliente
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public idCliente: number;

    /**
     * Variable que almacena la fecha de creacion del cliente
     * 
     * @type {Date}
     * @memberof ClienteCustomModel
     */
    public fechaCreacion: Date;

    /**
     * Variable que almacena la fecha de ultima actualizacion de datos.
     * 
     * @type {Date}
     * @memberof ClienteCustomModel
     */
    public fechaUltimoUpdate: Date;

    /**
     * Variable que almacena la fecha de nacimiento.
     * 
     * @type {Date}
     * @memberof ClienteCustomModel
     */
    public fechaNacimiento: Date;

    /**
     * Variable que almacena el id del estado del cliente
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public estadoClienteId: number;

    /**
     * Variable que almacena el nombre del estado del cliente
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public estadoClienteNombre: string;

    /**
     * Variable que almacena el id de la sucursal.
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public sucursalId: number;

    /**
     * Variable que almacena el nombre de la sucursal.
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public sucursalNombre: string;

    /**
     * Variable que almacena el id de usuario
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public idUsuario: number;

    /**
     * Variable que almacena el nombre de usuario
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public nombreUsuario: string;

    /**
     * Variable que almacena el id del estado de usuario
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public estadoUsuarioId: number;

    /**
     * Variable que almacena el nombre del estado de usuario.
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public estadoUsuarioNombre: string;

    /**
     * Variable que almacena el id del tipo de usuario
     * 
     * @type {number}
     * @memberof ClienteCustomModel
     */
    public tipoUsuarioId: number;

    /**
     * Variable que almacena el nombre del tipo de usuario.
     * 
     * @type {string}
     * @memberof ClienteCustomModel
     */
    public tipoUsuarioNombre: string;

}
