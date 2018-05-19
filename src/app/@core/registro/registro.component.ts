
import { PersonaService } from './../../@services/aplicacion/persona.service';
import { VehiculoModel } from './../../@model/aplicacion/vehiculo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from '../../@services/util/combo.service';
import { ComboModel } from '../../@model/util/combo.model';
import { ClienteModel } from '../../@model/aplicacion/cliente.model';
import { PersonaModel } from '../../@model/aplicacion/persona.model';
import { UsuarioModel } from '../../@model/aplicacion/usuario.model';
import { VehiculoService } from '../../@services/aplicacion/vehiculo.service';
import { ClienteService } from '../../@services/aplicacion/cliente.service';
import { UsuarioService } from '../../@services/aplicacion/usuario.service';
import { es } from '../../app.config';

/**
 * Componente del modulo de registros
 * Se gestiona la vista y los eventos.
 * @export
 * @class RegistroComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  /**
   * Fecha util para obtener el año para la vista.
   * El elemento es el que sencuentra en la parte baja del html del componente
   *
   * @type {Date}
   * @memberof LoginComponent
   */
  public test: Date = new Date();

  /**
   * Tipo de lenguaje usado por el calendario.
   *
   * @type {*}
   * @memberof RegistroComponent
   */
  public es: any;

  /**
   * Columnas de la tabla vehiculos.
   *
   * @type {*}
   * @memberof RegistroComponent
   */
  public cols: any;
  /**
   * Data cargada hacia la tabla de vehiculos.
   *
   * @type {*}
   * @memberof RegistroComponent
   */
  public data: VehiculoModel[];

  /**
   * Data que se ira insertando a medida que se ingresen vehiculos nuevos.
   * 
   * @private
   * @type {VehiculoModel[]}
   * @memberof RegistroComponent
   */
  private dataTemporal: VehiculoModel[];

  /**
   * Variable capaz de almacenar el formulario de ingreso de clientes.
   *
   * @type {FormGroup}
   * @memberof RegistroComponent
   */
  public formInsertarCliente: FormGroup;
  /**
   * Variable capaz de almacenar el formulario de ingreso de vehiculos.
   *
   * @type {FormGroup}
   * @memberof RegistroComponent
   */
  public formInsertarVehiculo: FormGroup;
  /**
   * Variable encargada de almacenar el resultado del combo pais.
   *
   * @type {ComboModel}
   * @memberof RegistroComponent
   */
  public comboPais: ComboModel[];
  /**
   * Variable encargada de almacenar el resultado del combo region.
   *
   * @type {ComboModel}
   * @memberof RegistroComponent
   */
  public comboRegion: ComboModel[];
  /**
   * Variable encargada de almacenar el resultado del combo provincia.
   *
   * @type {ComboModel[]}
   * @memberof RegistroComponent
   */
  public comboProvincia: ComboModel[];
  /**
   * Variable encargada de almacenar el resultado del combo comuna.
   *
   * @type {ComboModel[]}
   * @memberof RegistroComponent
   */
  public comboComuna: ComboModel[];
  /**
   * Variable encargada de almacenar el resultado del combo Marca vehiculo.
   *
   * @type {ComboModel[]}
   * @memberof RegistroComponent
   */
  public comboMarcaVehiculo: ComboModel[];
  /**
   * Variable encargada de almacenar el resultado del combo modelo del vehiculo.
   *
   * @type {ComboModel[]}
   * @memberof RegistroComponent
   */
  public comboModeloVehiculo: ComboModel[];

  /**
   * Crea una instancia del componente RegistroComponent.
   * Inicializa la injeccion de dependencias.
   * Construye los formularios de ingreso de vehiculos y clientes.
   * formInsertarCliente: variable de inicializacion del formulario de clientes.
   * formInsertarVehiculo: variable de inicializacion del formulario de vehiculos.
   *
   * @param {NgbModal} modalService servicio obligatorio de boostrap para utilizar
   * los modales en la version 4 de angular
   * @param {ComboService} srvCombo servicio que realiza llamadas http para
   * llenar combos.
   * @param {FormBuilder} fb para construir los diferentes formularios.
   * @param {VehiculoService} srvVehiculo servicio que realiza llamadas http con logica
   * de vehiculos
   * @param {PersonaService} srvPersona servicio que realiza llamadas http con logica
   * de personas
   * @param {ClienteService} srvCliente servicio que realiza llamadas http con logica
   * de clientes
   * @param {UsuarioService} srvUsuario servicio que realiza llamadas http con logica
   * de usuarios
   * @memberof RegistroComponent
   */
  constructor(
    private modalService: NgbModal,
    private srvCombo: ComboService,
    private fb: FormBuilder,
    private srvVehiculo: VehiculoService,
    private srvPersona: PersonaService,
    private srvCliente: ClienteService,
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
      tipoPersona: ['1'],
      comuna: [null],
      pass: [null, Validators.compose([Validators.required])],
      repass: [null, Validators.compose([Validators.required])]
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
   * Es llamado cuando se crea la vista.
   * Inicializa la injeccion de dependencias.
   * Invoca al los metodos
   * inicializarCalendar
   * llenarCombos
   * @memberof RegistroComponent
   */
  ngOnInit() {
    this.data = [];
    this.dataTemporal = [];
    this.inicializarCalendar();
    this.llenarCombos();
    this.iniciarColumnasTablaVehiculo();
  }

  public iniciarColumnasTablaVehiculo(): void {
    this.cols = [
      { field: 'patente', header: 'Patente' },
      { field: 'tipoVehiculoNombre', header: 'Marca' },
      { field: 'marcaVehiculoNombre', header: 'Modelo' }
    ];
  }

  /**
   * Metodo privado para inicializar el calendario en español.
   *
   * @private
   * @memberof RegistroComponent
   */
  private inicializarCalendar(): void {
    this.es = es;
  }

  /**
   * Methodo que abre el modal de ingreso de vehiculos.
   * Llama a los servicios para cargar los combos al momento que habre el modal.
   *
   * @param {any} content
   * @memberof RegistroComponent
   */
  public open(content): void {
    // Opciones del modal
    const options: NgbModalOptions = {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    // Servicio que abre el modal
    this.modalService.open(content, options).result.then(result => {});
  }
  /**
   * Guarda un vehiculo de forma temporal.
   * Para almacenarlo en el cliente principal.
   *
   * @param {*} obj valores del formulario asociados al modelo.
   * @memberof RegistroComponent
   */
  public guardarVehiculo(obj: any): void {
    const vehiculo = new VehiculoModel();
    vehiculo.marcaVehiculoId = obj.idMarcaVehiculo.code;
    vehiculo.tipoVehiculoId = obj.idTipoVehiculo.code;
    vehiculo.patente = obj.patente;
    vehiculo.marcaVehiculoNombre = obj.idMarcaVehiculo.name;
    vehiculo.tipoVehiculoNombre = obj.idTipoVehiculo.name;
    this.formInsertarVehiculo.reset();
    this.data.push(vehiculo);
    this.dataTemporal.push(vehiculo);
  }

  /**
   * Metodo que captura el evento submit del formulario insertar cliente.
   *
   * @param {*} obj valores del formulario asociados al modelo.
   * @memberof RegistroComponent
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
                        if (this.dataTemporal.length !== 0) {
                          this.dataTemporal.map((item) => {
                            item.clienteId = clienteId;
                            /**
                             * registramos todos los vehiculos que ingreso como nuevos en el sistema.
                             */
                            this.srvVehiculo.guardarVehiculo(item).subscribe(
                              respVehiculo => {
                                
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
   * Metodo que sera utilizado para llenar los combos de la pagina.
   * Llama a los siguientes servicios.
   * Combo Pais : srvCombo con su metodo getComboPais, llena la variable comboPais   *
   *
   * @memberof RegistroComponent
   */
  public llenarCombos(): void {
    this.srvCombo.getComboPais().subscribe(
      resp => {
        this.comboPais = resp.body.data;
      },
      error => {}
    );
    this.srvCombo.getComboMarca().subscribe(
      resp => {
        this.comboMarcaVehiculo = resp.body.data;
      },
      error => {}
    );
  }
  /**
   * evento change del combo pais, se utilizara para cargar en forma cascada
   * el combo region.
   * Combo region: srvCombo con su metodo getComboRegion, llena la variable comboRegion
   *
   * @param {ComboModel} event
   * @memberof RegistroComponent
   */
  public onChangePais(event: ComboModel): void {
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

  /**
   * evento change del combo marca, se utilizara para cargar en forma cascada
   * el combo modelo.
   * Combo comuna: srvCombo con su metodo getComboModelo, llena la variable comboModeloVehiculo
   *
   * @param {ComboModel} event
   * @memberof RegistroComponent
   */
  public onChangeMarca(event: ComboModel): void {
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
}
