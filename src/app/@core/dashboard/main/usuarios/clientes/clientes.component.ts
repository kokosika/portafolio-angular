import { PersonaService } from './../../../../../@services/aplicacion/persona.service';
import { ComboService } from './../../../../../@services/util/combo.service';
import { VehiculoModel } from './../../../../../@model/aplicacion/vehiculo.model';
import { ClienteService } from './../../../../../@services/aplicacion/cliente.service';
import { ClienteCustomModel } from './../../../../../@model/custom/cliente-custom.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { VehiculoService } from '../../../../../@services/aplicacion/vehiculo.service';
import { ComboModel } from '../../../../../@model/util/combo.model';
import { es } from '../../../../../app.config';
import { UtilidadService } from '../../../../../@services/util/utilidad.service';
import { UtlidadModel } from '../../../../../@model/util/utilidad.model';
import { ClienteModel } from '../../../../../@model/aplicacion/cliente.model';
import { PersonaModel } from '../../../../../@model/aplicacion/persona.model';
import { UsuarioModel } from '../../../../../@model/aplicacion/usuario.model';
import { UsuarioService } from '../../../../../@services/aplicacion/usuario.service';

/**
 * Componente encargado de administrar los usuarios tipo clientes del sistema.
 * Se podran realizar operaciones de tipo crud en este componente.
 * 
 * @export
 * @class ClientesComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})

export class ClientesComponent implements OnInit {
  
  /**
   * variable que va a contener el formulario de clientes.
   * 
   * @type {FormGroup}
   * @memberof ClientesComponent
   */
  public formInsertarCliente: FormGroup;

  /**
   * Variable que va a contener el formulario de vehiculos.
   * 
   * @type {FormGroup}
   * @memberof ClientesComponent
   */
  public formInsertarVehiculo: FormGroup;

  /**
   * Varibale que va a contener el formulario de edicion de clientes.
   * 
   * @type {FormGroup}
   * @memberof ClientesComponent
   */
  public formEditarCliente: FormGroup;

  /**
   * Variable que va a contener los datos del cliente en forma de lista.
   * 
   * @type {ClienteCustomModel[]}
   * @memberof ClientesComponent
   */
  public clienteData: ClienteCustomModel[];
  
  /**
   * Variable que almacena toda la informacion del cliente para visualizar su detalle.
   * 
   * @memberof ClientesComponent
   */
  public clienteDetalle = [];

  /**
   * Variable que almacenara el cliente para su edicion posterior.
   * 
   * @memberof ClientesComponent
   */
  public clienteEditar: ClienteCustomModel;

  /**
   * Columnas de la tabla cliente. Donde se registraran todos los datos de
   * la respuesta http del servidor.
   * 
   * @type {*}
   * @memberof ClientesComponent
   */
  public colsClientes: any;

  /**
   * Variable que almacenara los vehiculos del cliente.
   * 
   * @type {VehiculoModel[]}
   * @memberof ClientesComponent
   */
  public vehiculoData: VehiculoModel[];

  /**
   * Variable que almacenara los vehiculos del cliente de forma temporal.
   * 
   * @type {VehiculoModel[]}
   * @memberof ClientesComponent
   */
  public vehiculoDataTemporal: VehiculoModel[];

  /**
   * Columnas de la tabla vehiculos. Donde se registraran todos los datos de
   * la respuesta http del servidor.
   * 
   * @type {*}
   * @memberof ClientesComponent
   */
  public colsVehiculos: any;

  /**
   * Variable para generar el combo pais.
   * 
   * @type {ComboModel[]}
   * @memberof ClientesComponent
   */
  public comboPais: ComboModel[];
  /**
   * Variable para generar el combo region
   * 
   * @type {ComboModel[]}
   * @memberof ClientesComponent
   */
  public comboRegion: ComboModel[];

  /**
   * Variable para generar el combo provincia
   * 
   * @type {ComboModel[]}
   * @memberof ClientesComponent
   */
  public comboProvincia: ComboModel[];
  /**
   * Variable para generar el combo comuna
   * 
   * @type {ComboModel[]}
   * @memberof ClientesComponent
   */
  public comboComuna: ComboModel[];
  /**
   * Variable para generar el combo marca del vehiculo.
   * 
   * @type {ComboModel[]}
   * @memberof ClientesComponent
   */
  public comboMarcaVehiculo: ComboModel[];

  /**
   * Variable para generar el combo modelo del vehiculo.
   * 
   * @type {ComboModel[]}
   * @memberof ClientesComponent
   */
  public comboModeloVehiculo: ComboModel[];

  /**
   * Variable que contendra la localidad para el calendario
   * 
   * @type {*}
   * @memberof ClientesComponent
   */
  public es: any;

  /**
   * Despliega el fomulario de ingreso de vehiculos
   * 
   * @memberof ClientesComponent
   */
  public anadirVehiculo = false;
  
  /**
   * Id del cliente que se esta editando.
   * 
   * @memberof ClientesComponent
   */
  public clienteId = 0;

  /**
   * Id de la persona que se esta editando.
   * 
   * @memberof ClientesComponent
   */
  public personaId = 0;

  /**
   * Id del usuario que se esta editando.
   * 
   * @memberof ClientesComponent
   */
  public usuarioId = 0;


  /**
   * Crea las opciones de los radio button de estado de clientes
   * 
   * @type {UtlidadModel[]}
   * @memberof ClientesComponent
   */
  public radioEstadoCliente: UtlidadModel[];
  

  /**
   * Crea una instancia del componente RegistroComponent.
   * Inicializa la injeccion de dependencias.
   * Construye los formularios de ingreso de vehiculos y clientes.
   * formInsertarCliente: variable de inicializacion del formulario de clientes.
   * formEditarCliente: variable de inicializacion del formulario de editar clientes.
   * formInsertarVehiculo: variable de inicializacion del formulario de vehiculos.
   * 
   * @param {FormBuilder} fb para construir los diferentes formularios.
   * @param {ClienteService} srvCliente obtiene todos los servicios asociados al cliente.
   * @param {NgbModal} modalService servicio de botstrap para ejecucion de modales.
   * @param {VehiculoService} srvVehiculo obtiene todos los servicios asociados al vehiculo.
   * @param {ComboService} srvCombo obtiene todos los servicios asociados a los combos.
   * 
   * @memberof ClientesComponent 
   */
  constructor(
    private fb: FormBuilder,
    private srvCliente: ClienteService,
    private srvPersona: PersonaService,
    private modalServiceNivelUno: NgbModal,
    private modalServiceNivelDos: NgbModal,
    private srvVehiculo: VehiculoService,
    private srvCombo: ComboService,
    private srvUtilidad: UtilidadService,
    private srvUsuario: UsuarioService
  ) {
    this.formInsertarCliente = this.fb.group({
      id: [null],
      fechaCreacion: [null],
      fechaUltimoUpdate: [null],
      numId: [null, Validators.compose([Validators.required])],
      divId: [null, Validators.compose([Validators.required])],
      nombre: [null, Validators.compose([Validators.required])],
      apellido: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([Validators.required])],
      telefonoFijo: [null],
      telefonoCelular: [null],
      correo: [null, Validators.compose([Validators.required])],
      fechaNacimiento: [null],
      tipoPersona: [1],
      comuna: [null],
      pass: [null, Validators.compose([Validators.required])],
      repass: [null, Validators.compose([Validators.required])]
    });
    this.formEditarCliente = this.fb.group({
      id: [null],
      fechaCreacion: [null],
      fechaUltimoUpdate: [null],
      numId: [null, Validators.compose([Validators.required])],
      divId: [null, Validators.compose([Validators.required])],
      nombre: [null, Validators.compose([Validators.required])],
      apellido: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([Validators.required])],
      telefonoFijo: [null],
      telefonoCelular: [null],
      correo: [null, Validators.compose([Validators.required])],
      fechaNacimiento: [null],
      tipoPersona: [null],
      pais: [null],
      region: [null],
      provincia: [null],
      comuna: [null],
      estadoClienteId: [null]
    });
    this.formInsertarVehiculo = this.fb.group({
      id: [null],
      fechaCreacion: [null],
      fechaUltimoUpdate: [null],
      patente: [null, Validators.compose([Validators.required])],
      idTipoVehiculo: [null, Validators.compose([Validators.required])],
      idMarcaVehiculo: [null, Validators.compose([Validators.required])],
      idCliente: [null]
    });
  }

  /**
   * Metodo que se llama cuando se incia el render de la pagina.
   * Llama al los metodos  
   * *obtenerTodosLosClientes
   * *iniciarColumnasTablaCliente
   * *iniciarColumnasTablaVehiculo
   * *iniciarCombos
   * 
   * @memberof ClientesComponent
   */
  ngOnInit() {
    this.clienteData = [];
    this.vehiculoData = [];
    this.vehiculoDataTemporal = [];
    this.iniciarColumnasTablaCliente();
    this.iniciarColumnasTablaVehiculo();
    this.obtenerTodosLosClientes();
    this.iniciarCombos();
    this.generarRadioButton();
    this.es = es;
  }

  /**
   * Metodo privada que ejecuta el servicio ClienteService con su metodo obtenerTodosLosClientes
   * para listar todos los clientes en la tabla de la vista.
   * 
   * @private
   * @memberof ClientesComponent
   */
  private obtenerTodosLosClientes(): void {
    this.srvCliente.obtenerTodosLosClientes().subscribe(
      resp => {
        this.clienteData = resp.body.data;
      }
    );
  }

  /**
   * Metodo privado que ejecuta el servicio VehiculoService con su metodo buscarVehiculosPorIdCliente
   * para listar todos los vehiculos por cliente en la tabla de la vista.
   * 
   * @private
   * @param {number} clienteId parametro de busqueda de vehiculos por clientes
   * @memberof ClientesComponent
   */
  private buscarVehiculosPorIdCliente(clienteId: number) {
    this.srvVehiculo.buscarVehiculosPorIdCliente(clienteId).subscribe(
      resp => {
        this.vehiculoData = resp.body.data;
      }
    );
  }

  private generarRadioButton(): void {
    this.srvUtilidad.getRadioEstadoCliente().subscribe( resp => this.radioEstadoCliente = resp.body.data  );
  }

  /**
   * Inicializa las columnas de la tabla cliente
   * 
   * @private
   * @memberof ClientesComponent
   */
  private iniciarColumnasTablaCliente(): void {
    this.colsClientes = [
      { field: 'rut', header: 'Rut' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'correo', header: 'Correo' },
      { field: 'telefonoCelular', header: 'Telefono' },
      { field: 'comunaNombre', header: 'Comuna' },
      { field: 'fechaCreacion', header: 'Fecha Creacion' },
      { field: 'sucursalNombre', header: 'Sucursal' },
      { field: 'estadoClienteNombre', header: 'Estado' }
    ];
  }

  /**
   * Inicializa las columnas de la tabla vehiculo.
   * 
   * @private
   * @memberof ClientesComponent
   */
  private iniciarColumnasTablaVehiculo(): void {
    this.colsVehiculos = [
      { field: 'patente', header: 'Patente' },
      { field: 'marcaVehiculoNombre', header: 'Marca' },
      { field: 'tipoVehiculoNombre', header: 'Tipo' },
      { field: 'fechaCreacion', header: 'Fecha Creacion' }
    ];
  }

  /**
   * Inicializa los combos del componente
   * 
   * @private
   * @memberof ClientesComponent
   */
  private iniciarCombos(): void {
    this.srvCombo.getComboPais().subscribe(resp => this.comboPais = resp.body.data);
    this.srvCombo.getComboMarca().subscribe(resp => this.comboMarcaVehiculo = resp.body.data);
  }

  /**
   * Evento change del combo pais
   * Se utilizara para llenar el combo region
   * 
   * @param {*} value 
   * @memberof ClientesComponent
   */
  public onChangePais(event: ComboModel) {
    let resultado = new ComboModel();
    if (event === null) {
      resultado.code = -1;
      resultado.name = '';
    } else {
      resultado = event;
    }
    this.srvCombo.getComboRegion(resultado).subscribe(
      resp => {
        this.comboRegion = resp.body.data;
      },
      error => {}
    );
  }

  /**
   * evento change del combo region, se utilizara para cargar en forma cascada
   * el combo provinicia.
   * Combo provincia: srvCombo con su metodo getComboProvincia, llena la variable comboProvincia
   *
   * @param {ComboModel} event
   * @memberof RegistroComponent
   */
  public onChangeRegion(event: ComboModel): void {
    let resultado = new ComboModel();
    if (event === null) {
      resultado.code = -1;
    } else {
      resultado = event;
    }
    this.srvCombo.getComboProvincia(resultado).subscribe(
      resp => {
        this.comboProvincia = resp.body.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * evento change del combo provincia, se utilizara para cargar en forma cascada
   * el combo comuna.
   * Combo comuna: srvCombo con su metodo getComboComuna, llena la variable comboComuna
   *
   * @param {ComboModel} event
   * @memberof RegistroComponent
   */
  public onChangeProvincia(event: ComboModel): void {
    let resultado = new ComboModel();
    if (event === null) {
      resultado.code = -1;
    } else {
      resultado = event;
    }
    this.srvCombo.getComboComuna(resultado).subscribe(
      resp => {
        this.comboComuna = resp.body.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  public onChangeMarca (event: ComboModel): void {
    let resultado = new ComboModel();
    if (event === null) {
      resultado.code = -1;
    } else {
      resultado = event;
    }
    this.formInsertarVehiculo.controls['idMarcaVehiculo'].reset();
    this.srvCombo.getComboModelo(resultado).subscribe(
      resp => {
        this.comboModeloVehiculo = resp.body.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Abre un modal con los datos del cliente como detalle.
   * Servira como paso previo para la edicion del cliente.
   * 
   * @param {ClienteCustomModel} cliente 
   * @param {*} content 
   * @memberof ClientesComponent
   */
  public openDetalleCliente(cliente: ClienteCustomModel, content: any) {
    const options: NgbModalOptions = {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    const datePipe = new DatePipe('en-US');
    this.clienteId = cliente.idCliente;
    this.personaId = cliente.idPersona;
    this.usuarioId = cliente.idUsuario;
    this.clienteDetalle = [
      { campo: 'Rut: ' , valor: cliente.rut },
      { campo: 'Nombre: ' , valor: cliente.nombre },
      { campo: 'Apellido: ' , valor: cliente.apellido },
      { campo: 'Correo: ' , valor: cliente.correo },
      { campo: 'Comuna: ' , valor: cliente.comunaNombre },
      { campo: 'Direccion: ' , valor: cliente.direccion },
      { campo: 'Sucursal: ' , valor: cliente.sucursalNombre },
      { campo: 'Telefono: ' , valor: cliente.telefonoCelular },
      { campo: 'Estado Persona: ' , valor: cliente.estadoPersonaNombre },
      { campo: 'Tipo Persona: ' , valor: cliente.tipoPersonaNombre },
      { campo: 'Estado Cliente: ' , valor: cliente.estadoClienteNombre },
      { campo: 'Nombre Usuario: ' , valor: cliente.nombreUsuario },
      { campo: 'Estado Usuario: ' , valor: cliente.estadoUsuarioNombre },
      { campo: 'Tipo Usuario: ' , valor: cliente.tipoUsuarioNombre },
      { campo: 'Fecha Creacion: ' , valor: datePipe.transform(cliente.fechaCreacion, 'dd/MM/yyyy') },
      { campo: 'Fecha Ultima edicion: ' , valor: datePipe.transform(cliente.fechaUltimoUpdate, 'dd/MM/yyyy' ) }
    ];
    this.clienteEditar = cliente;
    this.resetFormularioEditar(this.clienteEditar);
    // Servicio que abre el modal
    this.modalServiceNivelUno.open(content, options).result.then(result => {});
  }

  /**
   * Abre el modal de edicion del cliente.
   * 
   * @param {*} content 
   * @memberof ClientesComponent
   */
  public openEditarCliente(content: any) {
    const options: NgbModalOptions = {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    // Asignar los valores para editar al cliente.
    this.buscarVehiculosPorIdCliente(this.clienteEditar.idCliente);
    // Servicio que abre el modal.
    this.modalServiceNivelUno.open(content, options).result.then(result => {});
  }

  /**
   * Abre el modal con el formulario para ingresar clientes.
   * 
   * @param content contenido del modal
   * @memberof ClientesComponent
   */
  public openInsertarCliente(content: any) {
    const options: NgbModalOptions = {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    // Servicio que abre el modal.
    this.modalServiceNivelUno.open(content, options).result.then(result => {});
  }

  /**
   * Methodo que abre el modal de ingreso de vehiculos.
   * Llama a los servicios para cargar los combos al momento que habre el modal.
   *
   * @param {any} content
   * @memberof ClientesComponent
   */
  public openIngresarVehiculos(): void {
    this.anadirVehiculo = !this.anadirVehiculo;
  }

  /**
   * 
   * Metodo que captura el evento submit del formulario insertar cliente.
   *
   * @param {*} obj valores del formulario asociados al modelo.
   * @memberof ClientesComponent
   */
  public guardarCliente(obj: any) {
    const cliente = new ClienteModel();
    const persona = new PersonaModel();
    const usuario = new UsuarioModel();
    cliente.estadoClienteId = 1;
    cliente.sucursalId = 1;
    persona.numId = obj.numId;
    persona.divId = obj.divId;
    persona.nombre = obj.nombre;
    persona.apellido = obj.apellido;
    persona.direccion = obj.direccion;
    persona.telefonoFijo = obj.telefonoFijo;
    persona.telefonoCelular = obj.telefonoCelular;
    persona.correo = obj.correo;
    persona.fechaNacimiento = obj.fechaNacimiento;
    persona.tipoPersonaId = obj.tipoPersona;
    persona.estadoPersonaId = 1;
    persona.comunaId = obj.comuna.code;
    usuario.nombre = persona.correo;
    usuario.contracena = obj.pass;
    usuario.tipoUsuarioId = 3;
    usuario.sucursalId = 1;
    usuario.estadoUsuarioId = 1;

    /**
     * Registramos la persona
     */
    this.srvPersona.guardarPersona(persona).subscribe(
      resp => {
        /**
         * Buscamos la persona para asignar los id a los demas miembros
         */
        this.srvPersona.buscarPersonaPorRut(persona.numId, persona.divId).subscribe(
          respBuscar => {
            const personaId = respBuscar.body.data.id;
            cliente.personaId = personaId;
            /**
             * Insertamos el cliente
             */
            this.srvCliente.guardarCliente(cliente).subscribe(
              respCliente => {
                usuario.personaId = personaId;
                /**
                 * Registramos al usuario.
                 */
                this.srvUsuario.guardarUsuario(usuario).subscribe(
                  respUsuario => {
                    /**
                     * Buscamos el id del cliente para asignar a los vehiculos.
                     */
                    this.srvCliente.buscarClientePorRut(persona.numId, persona.divId).subscribe(
                      respBusquedaCliente => {
                        const clienteId = respBusquedaCliente.body.data.id;
                        if (this.vehiculoDataTemporal.length !== 0) {
                          this.vehiculoDataTemporal.map((item) => {
                            item.clienteId = clienteId;
                            /**
                             * registramos todos los vehiculos que ingreso como nuevos en el sistema.
                             */
                            this.srvVehiculo.guardarVehiculo(item).subscribe(
                              respVehiculo => {
                                this.obtenerTodosLosClientes();
                                this.vehiculoDataTemporal = [];
                              }
                            );
                          });
                        }
                      }
                    );
                  }
                );
              }
            );
          }
        );
      },
      error => {

      }
    );
  }

  /**
   * Guarda un vehiculo de forma temporal.
   * Para almacenarlo en el cliente principal.
   *
   * @param {*} obj valores del formulario asociados al modelo.
   * @memberof ClientesComponent
   */
  public guardarVehiculo(obj: any): void {
    const vehiculo = new VehiculoModel();
    vehiculo.marcaVehiculoId = obj.idMarcaVehiculo.code;
    vehiculo.tipoVehiculoId = obj.idTipoVehiculo.code;
    vehiculo.patente = obj.patente;
    vehiculo.marcaVehiculoNombre = obj.idMarcaVehiculo.name;
    vehiculo.tipoVehiculoNombre = obj.idTipoVehiculo.name;
    this.formInsertarVehiculo.reset();
    this.vehiculoData.push(vehiculo);
    this.vehiculoDataTemporal.push(vehiculo);
    this.anadirVehiculo = false;
  }

  /**
   * Crea un nuevo formulario para editar al cliente y ademas antes lo resetea.
   * 
   * @private
   * @param {ClienteCustomModel} cliente 
   * @memberof ClientesComponent
   */
  private resetFormularioEditar(cliente: ClienteCustomModel): void {
    this.formEditarCliente.reset();
    this.formEditarCliente.controls['tipoPersona'].setValue(cliente.tipoPersonaId);
    this.formEditarCliente.controls['numId'].setValue(cliente.rut.split('-')[0]);
    this.formEditarCliente.controls['divId'].setValue(cliente.rut.split('-')[1]);
    this.formEditarCliente.controls['nombre'].setValue(cliente.nombre);
    this.formEditarCliente.controls['apellido'].setValue(cliente.apellido);
    this.formEditarCliente.controls['direccion'].setValue(cliente.direccion);
    const comboPais = { code: cliente.paisId , name: cliente.paisNombre};
    this.onChangePais(comboPais);
    this.formEditarCliente.controls['pais'].setValue(comboPais);
    const comboRegion = { code: cliente.regionId , name: cliente.regionNombre};
    this.onChangeRegion(comboRegion);
    this.formEditarCliente.controls['region'].setValue(comboRegion);
    const comboProvincia = { code: cliente.provinciaId , name: cliente.provinciaNombre};
    this.onChangeProvincia(comboProvincia);
    this.formEditarCliente.controls['provincia'].setValue(comboProvincia);
    const comboComuna = { code: cliente.comunaId , name: cliente.comunaNombre};
    this.formEditarCliente.controls['comuna'].setValue(comboComuna);
    this.formEditarCliente.controls['telefonoFijo'].setValue(cliente.telefonoFijo);
    this.formEditarCliente.controls['telefonoCelular'].setValue(cliente.telefonoCelular);
    this.formEditarCliente.controls['correo'].setValue(cliente.correo);
    const datePipe = new DatePipe('en-US');
    const fechaArray: string[] = datePipe.transform(cliente.fechaNacimiento, 'dd/MM/yyyy').split('/');
    const fecha = new Date(Number.parseInt(fechaArray[2]), Number.parseInt(fechaArray[1]) - 1, Number.parseInt(fechaArray[0]) );
    this.formEditarCliente.controls['fechaNacimiento'].setValue(fecha);
    this.formEditarCliente.controls['estadoClienteId'].setValue(cliente.estadoClienteId);
  }

  public editarCliente (cliente: any): void {
    cliente.idCliente = this.clienteEditar.idCliente;
    cliente.idPersona = this.clienteEditar.idPersona;
    this.srvCliente.editarCliente(cliente).subscribe(
      resp => {
        this.srvPersona.editarPersona(cliente).subscribe(
          respPersona => {
            this.vehiculoDataTemporal.map((vehiculo) => {
              const vehiculoDto = new VehiculoModel();
              vehiculoDto.clienteId = this.clienteEditar.idCliente;
              vehiculoDto.marcaVehiculoId = vehiculo.marcaVehiculoId;
              vehiculoDto.tipoVehiculoId = vehiculo.tipoVehiculoId;
              vehiculoDto.patente = vehiculo.patente;
              this.srvVehiculo.guardarVehiculo(vehiculoDto).subscribe(
                respVehiculo => {
                  this.obtenerTodosLosClientes();
                  this.vehiculoDataTemporal = [];
                  this.buscarVehiculosPorIdCliente(this.clienteId);
                  alert(resp.body.data);
                  this.obtenerTodosLosClientes();
                }
              );
            });
          }
        );
      }
    );
  }
}
