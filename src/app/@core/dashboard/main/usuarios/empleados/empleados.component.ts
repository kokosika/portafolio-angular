import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoCustomModel } from '../../../../../@model/custom/empleado-custom.model';
import { ComboModel } from '../../../../../@model/util/combo.model';
import { UtlidadModel } from '../../../../../@model/util/utilidad.model';
import { EmpleadoService } from '../../../../../@services/aplicacion/empleado.service';
import { PersonaService } from '../../../../../@services/aplicacion/persona.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from '../../../../../@services/util/combo.service';
import { UtilidadService } from '../../../../../@services/util/utilidad.service';
import { UsuarioService } from '../../../../../@services/aplicacion/usuario.service';
import { es } from '../../../../../app.config';
import { DatePipe } from '@angular/common';
import { EmpleadoModel } from '../../../../../@model/aplicacion/empleado.model';
import { PersonaModel } from '../../../../../@model/aplicacion/persona.model';
import { UsuarioModel } from '../../../../../@model/aplicacion/usuario.model';

/**
 * Componenete encargado del mantenedor de empleados.
 * 
 * @export
 * @class EmpleadosComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {
  /**
   * variable que va a contener el formulario de empleados.
   * 
   * @type {FormGroup}
   * @memberof EmpleadosComponent
   */
  public formInsertarEmpleado: FormGroup;

  
  /**
   * Varibale que va a contener el formulario de edicion de empleados.
   * 
   * @type {FormGroup}
   * @memberof EmpleadosComponent
   */
  public formEditarEmpleado: FormGroup;

  /**
   * Variable que va a contener los datos del los empleados en forma de lista.
   * 
   * @type {ProveedorCustomModel[]}
   * @memberof EmpleadosComponent
   */
  public empleadoData: EmpleadoCustomModel[];
  
  /**
   * Variable que almacena toda la informacion del empleado para visualizar su detalle.
   * 
   * @memberof EmpleadosComponent
   */
  public empleadoDetalle = [];

  /**
   * Variable que almacenara el empleado para su edicion posterior.
   * 
   * @type {EmpleadoCustomModel}
   * @memberof EmpleadosComponent
   */
  public empleadoEditar: EmpleadoCustomModel;

  /**
   * Columnas de la tabla empleado. Donde se registraran todos los datos de
   * la respuesta http del servidor.
   * 
   * @type {*}
   * @memberof EmpleadosComponent
   */
  public colsEmpleados: any;

  /**
   * Variable para generar el combo pais.
   * 
   * @type {ComboModel[]}
   * @memberof EmpleadosComponent
   */
  public comboPais: ComboModel[];
  /**
   * Variable para generar el combo region
   * 
   * @type {ComboModel[]}
   * @memberof EmpleadosComponent
   */
  public comboRegion: ComboModel[];

  /**
   * Variable para generar el combo provincia
   * 
   * @type {ComboModel[]}
   * @memberof EmpleadosComponent
   */
  public comboProvincia: ComboModel[];
  /**
   * Variable para generar el combo comuna
   * 
   * @type {ComboModel[]}
   * @memberof EmpleadosComponent
   */
  public comboComuna: ComboModel[];

  /**
   * Variable para generar el combo sucursal
   * 
   * @type {ComboModel[]}
   * @memberof EmpleadosComponent
   */
  public comboSucursal: ComboModel[];
 
  /**
   * Variable que contendra la localidad para el calendario
   * 
   * @type {*}
   * @memberof EmpleadosComponent
   */
  public es: any;

 
  /**
   * Id del empleado que se esta editando.
   * 
   * @type {number}
   * @memberof EmpleadosComponent
   */
  public empleadoId = 0;

  /**
   * Id de la persona que se esta editando.
   * 
   * @type {number}
   * @memberof EmpleadosComponent
   */
  public personaId = 0;

  /**
   * Id del usuario que se esta editando.
   * 
   * @type {number}
   * @memberof EmpleadosComponent
   */
  public usuarioId = 0;


  /**
   * Crea las opciones de los radio button de estado de los empleados
   * 
   * @type {UtlidadModel[]}
   * @memberof EmpleadosComponent
   */
  public radioEstadoEmpleado: UtlidadModel[];

  /**
   * Crea las opciones de los radio button de tipo de los empleados
   * 
   * @type {UtlidadModel[]}
   * @memberof EmpleadosComponent
   */
  public radioTipoEmpleado: UtlidadModel[];
  

  /**
   * Crea una instancia del componente RegistroComponent.
   * Inicializa la injeccion de dependencias.
   * Construye los formularios de ingreso de los empleados.
   * formInsertarEmpleado: variable de inicializacion del formulario de los empleados.
   * formEditarEmpleado: variable de inicializacion del formulario de editar emlleadps.
   * 
   * @param {FormBuilder} fb para construir los diferentes formularios.
   * @param {EmpleadoService} srvEmpleado obtiene todos los servicios asociados al empleado.
   * @param {NgbModal} modalService servicio de botstrap para ejecucion de modales.
   * @param {ComboService} srvCombo obtiene todos los servicios asociados a los combos.
   * 
   * @memberof EmpleadosComponent 
   */
  constructor(
    private fb: FormBuilder,
    private srvEmpleado: EmpleadoService,
    private srvPersona: PersonaService,
    private modalServiceNivelUno: NgbModal,
    private modalServiceNivelDos: NgbModal,
    private srvCombo: ComboService,
    private srvUtilidad: UtilidadService,
    private srvUsuario: UsuarioService
  ) {
    this.formInsertarEmpleado = this.fb.group({
      id: [null],
      fechaCreacion: [null],
      fechaUltimoUpdate: [null],
      numId: [null, Validators.compose([Validators.required])],
      divId: [null, Validators.compose([Validators.required])],
      nombre: [null, Validators.compose([Validators.required])],
      apellido: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([Validators.required])],
      telefonoFijo: [null],
      correo: [null, Validators.compose([Validators.required])],
      tipoPersona: [2],
      comuna: [null],
      tipoEmpleadoId: [1],
      pass: [null, Validators.compose([Validators.required])],
      repass: [null, Validators.compose([Validators.required])],
      sucursal: [null, Validators.compose([Validators.required])]
    });
    this.formEditarEmpleado = this.fb.group({
      id: [null],
      fechaCreacion: [null],
      fechaUltimoUpdate: [null],
      numId: [null, Validators.compose([Validators.required])],
      divId: [null, Validators.compose([Validators.required])],
      nombre: [null, Validators.compose([Validators.required])],
      apellido: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([Validators.required])],
      telefonoFijo: [null],
      correo: [null, Validators.compose([Validators.required])],
      tipoPersona: [null],
      pais: [null],
      region: [null],
      provincia: [null],
      comuna: [null],
      tipoEmpleadoId: [null],
      estadoEmpleadoId: [null],
      sucursal: [null, Validators.compose([Validators.required])]
    });
  }

  /**
   * Metodo que se llama cuando se incia el render de la pagina.
   * Llama al los metodos  
   * *obtenerTodosLosEmpleado
   * *iniciarColumnasTablaEmpleado
   * *iniciarCombos
   * 
   * @memberof EmpleadosComponent
   */
  ngOnInit() {
    this.empleadoData = [];
    this.iniciarColumnasTablaEmpleado();
    this.obtenerTodosLosEmpleado();
    this.iniciarCombos();
    this.generarRadioButton();
    this.es = es;
  }

  /**
   * Metodo privada que ejecuta el servicio EmpeladoService con su metodo obtenerTodosLosEmpleados
   * para listar todos los empleados en la tabla de la vista.
   * 
   * @private
   * @memberof EmpleadosComponent
   */
  private obtenerTodosLosEmpleado(): void {
    this.srvEmpleado.obtenerTodosLosEmpleados().subscribe(
      resp => {
        this.empleadoData = resp.body.data;
      }
    );
  }

  /**
   * Metodo privado que generara los radio button para la aplicacion
   * en su parte de empleados.
   * 
   * @private
   * @memberof EmpleadosComponent
   */
  private generarRadioButton(): void {
    this.srvUtilidad.getRadioEstadoEmpleado().subscribe( resp => this.radioEstadoEmpleado = resp.body.data  );
    this.srvUtilidad.getRadioTipoEmpleado().subscribe( resp => this.radioTipoEmpleado = resp.body.data  );
  }

  /**
   * Inicializa las columnas de la tabla empleado
   * 
   * @private
   * @memberof EmpleadosComponent
   */
  private iniciarColumnasTablaEmpleado(): void {
    this.colsEmpleados = [
      { field: 'rut', header: 'Rut' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'correo', header: 'Correo' },
      { field: 'telefonoFijo', header: 'Telefono' },
      { field: 'comunaNombre', header: 'Comuna' },
      { field: 'fechaCreacion', header: 'Fecha Creacion' },
      { field: 'estadoEmpleadoNombre', header: 'Estado' }
    ];
  }

   /**
   * Inicializa los combos del componente
   * 
   * @private
   * @memberof EmpleadosComponent
   */
  private iniciarCombos(): void {
    this.srvCombo.getComboPais().subscribe(resp => this.comboPais = resp.body.data);
    this.srvCombo.getComboSucursal().subscribe(resp => this.comboSucursal = resp.body.data);
  }

  /**
   * Evento change del combo pais
   * Se utilizara para llenar el combo region
   * 
   * @param {*} value 
   * @memberof EmpleadosComponent
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

  /**
   * Abre un modal con los datos del empleado como detalle.
   * Servira como paso previo para la edicion del empleado.
   * 
   * @param {EmpleadoCustomModel} empleado 
   * @param {*} content 
   * @memberof EmpleadosComponent
   */
  public openDetalleEmpleado(empleado: EmpleadoCustomModel, content: any) {
    const options: NgbModalOptions = {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    this.empleadoId = empleado.empleadoId;
    this.personaId = empleado.personaId;
    this.usuarioId = empleado.idUsuario;
    const datePipe = new DatePipe('en-US');
    this.empleadoDetalle = [
      { campo: 'Rut: ' , valor: empleado.rut },
      { campo: 'Nombre: ' , valor: empleado.nombre },
      { campo: 'Apellido: ' , valor: empleado.apellido },
      { campo: 'Correo: ' , valor: empleado.correo },
      { campo: 'Comuna: ' , valor: empleado.comunaNombre },
      { campo: 'Direccion: ' , valor: empleado.direccion },
      { campo: 'Estado Persona: ' , valor: empleado.estadoPersonaNombre },
      { campo: 'Sucursal: ' , valor: empleado.sucursalNombre },
      { campo: 'Tipo Persona: ' , valor: empleado.tipoPersonaNombre },
      { campo: 'Estado Cliente: ' , valor: empleado.estadoEmpleadoNombre },
      { campo: 'Nombre Usuario: ' , valor: empleado.nombreUsuario },
      { campo: 'Estado Usuario: ' , valor: empleado.estadoUsuarioNombre },
      { campo: 'Tipo Usuario: ' , valor: empleado.tipoUsuarioNombre },
      { campo: 'Fecha Creación: ' , valor:  datePipe.transform(empleado.fechaCreacion, 'dd/MM/yyyy')},
      { campo: 'Fecha Ultima edición: ' , valor: datePipe.transform(empleado.fechaUltimoUpdate, 'dd/MM/yyyy') }
    ];
    this.empleadoEditar = empleado;
    this.resetFormularioEditar(this.empleadoEditar);
    // Servicio que abre el modal
    this.modalServiceNivelUno.open(content, options).result.then(result => {});
  }

  /**
   * Abre el modal de edicion del empleado.
   * 
   * @param {*} content 
   * @memberof EmpleadosComponent
   */
  public openEditarEmpleado(content: any) {
    this.resetFormularioEditar(this.empleadoEditar);
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
   * Abre el modal con el formulario para ingresar empleados.
   * 
   * @param content contenido del modal
   * @memberof EmpleadosComponent
   */
  public openInsertarEmpleado(content: any) {
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
   * 
   * Metodo que captura el evento submit del formulario insertar el empleado.
   *
   * @param {*} obj valores del formulario asociados al modelo.
   * @memberof EmpleadosComponent
   */
  public guardarEmpleado(obj: any) {
    const empleado = new EmpleadoModel();
    const persona = new PersonaModel();
    const usuario = new UsuarioModel();
    empleado.estadoEmpleadoId = 1;
    empleado.tipoEmpleadoId = obj.tipoEmpleadoId;
    empleado.sucursalId = obj.sucursal.code;
    persona.numId = obj.numId;
    persona.divId = obj.divId;
    persona.nombre = obj.nombre;
    persona.apellido = obj.apellido;
    persona.direccion = obj.direccion;
    persona.telefonoFijo = obj.telefonoFijo;
    persona.correo = obj.correo;
    persona.tipoPersonaId = 1;
    persona.estadoPersonaId = 1;
    persona.comunaId = obj.comuna.code;
    usuario.nombre = persona.correo;
    usuario.contracena = obj.pass;
    usuario.tipoUsuarioId = 1;
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
            empleado.personaId = personaId;
            /**
             * Insertamos el empleado
             */
            this.srvEmpleado.guardarEmpleado(empleado).subscribe(
              respProveedor => {
                usuario.personaId = personaId;
                /**
                 * Registramos al usuario.
                 */
                this.srvUsuario.guardarUsuario(usuario).subscribe(
                  respUsuario => {
                    this.obtenerTodosLosEmpleado();
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
   * Crea un nuevo formulario para editar el empleado y ademas antes lo resetea.
   * 
   * @private
   * @param {EmpleadoCustomModel} empleado 
   * @memberof EmpleadosComponent
   */
  private resetFormularioEditar(empleado: EmpleadoCustomModel): void {
    this.formEditarEmpleado.reset();
    this.formEditarEmpleado.controls['tipoPersona'].setValue(empleado.tipoPersonaId);
    this.formEditarEmpleado.controls['numId'].setValue(empleado.rut.split('-')[0]);
    this.formEditarEmpleado.controls['divId'].setValue(empleado.rut.split('-')[1]);
    this.formEditarEmpleado.controls['nombre'].setValue(empleado.nombre);
    this.formEditarEmpleado.controls['apellido'].setValue(empleado.apellido);
    this.formEditarEmpleado.controls['direccion'].setValue(empleado.direccion);
    const comboPais = { code: empleado.paisId , name: empleado.paisNombre};
    this.onChangePais(comboPais);
    this.formEditarEmpleado.controls['pais'].setValue(comboPais);
    const comboRegion = { code: empleado.regionId , name: empleado.regionNombre};
    this.onChangeRegion(comboRegion);
    this.formEditarEmpleado.controls['region'].setValue(comboRegion);
    const comboProvincia = { code: empleado.provinciaId , name: empleado.provinciaNombre};
    this.onChangeProvincia(comboProvincia);
    this.formEditarEmpleado.controls['provincia'].setValue(comboProvincia);
    const comboComuna = { code: empleado.comunaId , name: empleado.comunaNombre};
    this.formEditarEmpleado.controls['comuna'].setValue(comboComuna);
    const comboSucursal = {code : empleado.sucursalId, name: empleado.sucursalNombre};
    this.formEditarEmpleado.controls['sucursal'].setValue(comboSucursal);
    this.formEditarEmpleado.controls['telefonoFijo'].setValue(empleado.telefonoFijo);
    this.formEditarEmpleado.controls['correo'].setValue(empleado.correo);
    this.formEditarEmpleado.controls['estadoEmpleadoId'].setValue(empleado.estadoEmpleadoId);
    this.formEditarEmpleado.controls['tipoEmpleadoId'].setValue(empleado.tipoEmpleadoId);
  }

  /**
   * 
   * Evento que se ejecuta cuando se edita un empleado dentro del sistema.
   * 
   * @param {any} empleado empleado que viene del formularo
   * @memberof EmpleadosComponent
   */
  public editarEmpleado (empleado: any): void {
    empleado.empleadoId = this.empleadoEditar.empleadoId;
    empleado.personaId = this.empleadoEditar.personaId;
    empleado.sucursalId = empleado.sucursal.code;
    this.srvEmpleado.editarEmpleado(empleado).subscribe(
      resp => {
        this.srvPersona.editarPersona(empleado).subscribe(
          respPersona => {
            console.log(respPersona);
            this.obtenerTodosLosEmpleado();
        });
      }
    );
  }
}

