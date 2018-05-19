/**
 * Contiene el modelo completo del proveedor para obtener y mapear todos los
 * datos que envie el servidor del proveedor para mostrarlos en forma de tabla.
 * Incluye datos de personas asociadas al proveedor.
 * 
 * @export
 * @class ProveedorCustomModel
 */
export class ProveedorCustomModel {
    /**
     * Variable que almacena el id de la persona
     */
    public personaId: number;

    /**
     * Variable que almacena el apellido de la persona
     */
    public apellido: string;

    /**
     * Variable que almacena el correo de la persona.
     */
    public correo: string;

    /**
     * Variable que almacena la direccion de la persona.
     */
    public direccion: string;

    /**
     * Variable que almacena el rut de la persona.
     */
    public rut: string;

    /**
     * Variable que almacena el nombre de la persona.
     */
    public nombre: string;

    /**
     * Variable que almacena el telefono celular de la persona.
     */
    public telefonoCelular: number;

    /**
     * Variable que almacena el telefono fijo de la persona.
     */
    public telefonoFijo: number;

    /**
     * Variable que almacena el id del pais.
     */
    public paisId: number;
    /**
     * Variable que almacena el nombre del pais.
     */
    public paisNombre: string;
    /**
     * Variable que almacena el id de la region.
     */
    public regionId: number;
    /**
     * Variable que almacena el nombre de la region.
     */
    public regionNombre: string;
    /**
     * Variable que almacena el id de la provincia.
     */
    public provinciaId: number;
    /**
     * Variable que almacena el nombre de la provincia.
     */
    public provinciaNombre: string;

    /**
     * Variable que almacena el id de la comuna
     */
    public comunaId: number;

    /**
     * Variable que almacena el nombre de la comuna
     */
    public comunaNombre: string;

    /**
     * Variable que almacena el estado de la persona id
     */
    public estadoPersonaId: number;

    /**
     * Variable que almacena el nombre del estado de la persona
     */
    public estadoPersonaNombre: string;

    /**
     * Variable que almacena el id del tipo de persona
     */
    public tipoPersonaId: number;

    /**
     * Variable que almacena el nombre del tipo de persona
     */
    public tipoPersonaNombre: string;

    /**
     * Variable que almacena la fecha de creacion del cliente
     */
    public fechaCreacion: Date;

    /**
     * Variable que almacena la fecha de ultima actualizacion de datos.
     */
    public fechaUltimoUpdate: Date;

    /**
     * Variable que almacena el id del proveedor.
     */
    public proveedorId: number;

    /**
     * Variable que almacena el id del estado del proveedor.
     */
    public estadoProveedorId: number;

    /**
     * Variable que almacena el nombre del estado del proveedor.
     */
    public estadoProveedorNombre: string;

    /**
     * Variable que almacena el id del tipo del proveedor.
     */
    public tipoProveedorId: number;

    /**
     * Variable que almacena el nombre del tipo de proveedor.
     */
    public tipoProveedorNombre: string;

    /**
     * Variable que almacena el id de usuario
     */
    public idUsuario: number;

    /**
     * Variable que almacena el nombre de usuario
     */
    public nombreUsuario: string;

    /**
     * Variable que almacena el id del estado de usuario
     */
    public estadoUsuarioId: number;

    /**
     * Variable que almacena el nombre del estado de usuario.
     */
    public estadoUsuarioNombre: string;

    /**
     * Variable que almacena el id del tipo de usuario
     */
    public tipoUsuarioId: number;

    /**
     * Variable que almacena el nombre del tipo de usuario.
     */
    public tipoUsuarioNombre: string;
    /**
     * Variable que almacena la fecha de nacimiento.
     */
    public fechaNacimiento: Date;


}
