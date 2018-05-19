import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from '../../../../../@services/aplicacion/proveedor.service';
import { ComboService } from '../../../../../@services/util/combo.service';
import { ProveedorCustomModel } from '../../../../../@model/custom/proveedor-custom.model';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboModel } from '../../../../../@model/util/combo.model';
import { UtlidadModel } from '../../../../../@model/util/utilidad.model';
import { PersonaService } from '../../../../../@services/aplicacion/persona.service';
import { UtilidadService } from '../../../../../@services/util/utilidad.service';
import { UsuarioService } from '../../../../../@services/aplicacion/usuario.service';
import { es } from '../../../../../app.config';
import { ProveedorModel } from '../../../../../@model/aplicacion/proveedor.model';
import { PersonaModel } from '../../../../../@model/aplicacion/persona.model';
import { UsuarioModel } from '../../../../../@model/aplicacion/usuario.model';
import { DatePipe } from '@angular/common';

/**
 * Componenete encargado del mantenedor de proveedores.
 * 
 * @export
 * @class ProveedoresComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  /**
   * variable que va a contener el formulario de proveedores.
   * 
   * @type {FormGroup}
   * @memberof ProveedoresComponent
   */
  public formInsertarProveedor: FormGroup;

  
  /**
   * Varibale que va a contener el formulario de edicion de proveedores.
   * 
   * @type {FormGroup}
   * @memberof ProveedoresComponent
   */
  public formEditarProveedor: FormGroup;

  /**
   * Variable que va a contener los datos del proveedor en forma de lista.
   * 
   * @type {ProveedorCustomModel[]}
   * @memberof ProveedoresComponent
   */
  public proveedorData: ProveedorCustomModel[];
  
  /**
   * Variable que almacena toda la informacion del proveedor para visualizar su detalle.
   * 
   * @memberof ProveedoresComponent
   */
  public proveedorDetalle = [];

  /**
   * Variable que almacenara el proveedor para su edicion posterior.
   * 
   * @memberof ProveedoresComponent
   */
  public proveedorEditar: ProveedorCustomModel;

  /**
   * Columnas de la tabla proveedor. Donde se registraran todos los datos de
   * la respuesta http del servidor.
   * 
   * @type {*}
   * @memberof ProveedoresComponent
   */
  public colsProveedores: any;

  /**
   * Variable para generar el combo pais.
   * 
   * @type {ComboModel[]}
   * @memberof ProveedoresComponent
   */
  public comboPais: ComboModel[];
  /**
   * Variable para generar el combo region
   * 
   * @type {ComboModel[]}
   * @memberof ProveedoresComponent
   */
  public comboRegion: ComboModel[];

  /**
   * Variable para generar el combo provincia
   * 
   * @type {ComboModel[]}
   * @memberof ProveedoresComponent
   */
  public comboProvincia: ComboModel[];
  /**
   * Variable para generar el combo comuna
   * 
   * @type {ComboModel[]}
   * @memberof ProveedoresComponent
   */
  public comboComuna: ComboModel[];
 
  /**
   * Variable que contendra la localidad para el calendario
   * 
   * @type {*}
   * @memberof ProveedoresComponent
   */
  public es: any;

 
  /**
   * Id del proveedor que se esta editando.
   * 
   * @memberof ProveedoresComponent
   */
  public proveedorId = 0;

  /**
   * Id de la persona que se esta editando.
   * 
   * @memberof ProveedoresComponent
   */
  public personaId = 0;

  /**
   * Id del usuario que se esta editando.
   * 
   * @memberof ProveedoresComponent
   */
  public usuarioId = 0;


  /**
   * Crea las opciones de los radio button de estado de proveedores
   * 
   * @type {UtlidadModel[]}
   * @memberof ProveedoresComponent
   */
  public radioEstadoProveedor: UtlidadModel[];

  /**
   * Crea las opciones de los radio button de tipo de proveedores
   * 
   * @type {UtlidadModel[]}
   * @memberof ProveedoresComponent
   */
  public radioTipoProveedor: UtlidadModel[];
  

  /**
   * Crea una instancia del componente RegistroComponent.
   * Inicializa la injeccion de dependencias.
   * Construye los formularios de ingreso de proveedores.
   * formInsertarProveedor: variable de inicializacion del formulario de proveedores.
   * formEditarProveedor: variable de inicializacion del formulario de editar proveedores.
   * 
   * @param {FormBuilder} fb para construir los diferentes formularios.
   * @param {ProveedorService} srvProveedor obtiene todos los servicios asociados al proveedor.
   * @param {NgbModal} modalService servicio de botstrap para ejecucion de modales.
   * @param {ComboService} srvCombo obtiene todos los servicios asociados a los combos.
   * 
   * @memberof ProveedoresComponent 
   */
  constructor(
    private fb: FormBuilder,
    private srvProveedor: ProveedorService,
    private srvPersona: PersonaService,
    private modalServiceNivelUno: NgbModal,
    private modalServiceNivelDos: NgbModal,
    private srvCombo: ComboService,
    private srvUtilidad: UtilidadService,
    private srvUsuario: UsuarioService
  ) {
    this.formInsertarProveedor = this.fb.group({
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
    this.formEditarProveedor = this.fb.group({
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
  }

  /**
   * Metodo que se llama cuando se incia el render de la pagina.
   * Llama al los metodos  
   * *obtenerTodosLosProveedores
   * *iniciarColumnasTablaProveedor
   * *iniciarCombos
   * 
   * @memberof ProveedoresComponent
   */
  ngOnInit() {
    this.proveedorData = [];
    this.iniciarColumnasTablaProveedor();
    this.obtenerTodosLosProveedores();
    this.iniciarCombos();
    this.generarRadioButton();
    this.es = es;
  }

  /**
   * Metodo privada que ejecuta el servicio ProveedorService con su metodo obtenerTodosLosProveedores
   * para listar todos los proveedores en la tabla de la vista.
   * 
   * @private
   * @memberof ProveedoresComponent
   */
  private obtenerTodosLosProveedores(): void {
    this.srvProveedor.obtenerTodosLosProveedores().subscribe(
      resp => {
        this.proveedorData = resp.body.data;
      }
    );
  }

  
  private generarRadioButton(): void {
    this.srvUtilidad.getRadioEstadoProveedor().subscribe( resp => this.radioEstadoProveedor = resp.body.data  );
    this.srvUtilidad.getRadioTipoProveedor().subscribe( resp => this.radioTipoProveedor = resp.body.data  );
  }

  /**
   * Inicializa las columnas de la tabla proveedor
   * 
   * @private
   * @memberof ProveedoresComponent
   */
  private iniciarColumnasTablaProveedor(): void {
    this.colsProveedores = [
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
   * Inicializa los combos del componente
   * 
   * @private
   * @memberof ProveedoresComponent
   */
  private iniciarCombos(): void {
    this.srvCombo.getComboPais().subscribe(resp => this.comboPais = resp.body.data);
  }

  /**
   * Evento change del combo pais
   * Se utilizara para llenar el combo region
   * 
   * @param {*} value 
   * @memberof ProveedoresComponent
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
   * Abre un modal con los datos del proveedor como detalle.
   * Servira como paso previo para la edicion del proveedor.
   * 
   * @param {ProveedorCustomModel} proveedor 
   * @param {*} content 
   * @memberof ProveedoresComponent
   */
  public openDetalleProveedor(proveedor: ProveedorCustomModel, content: any) {
    const options: NgbModalOptions = {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    this.proveedorId = proveedor.proveedorId;
    this.personaId = proveedor.personaId;
    this.usuarioId = proveedor.idUsuario;
    this.proveedorDetalle = [
      { campo: 'Rut: ' , valor: proveedor.rut },
      { campo: 'Nombre: ' , valor: proveedor.nombre },
      { campo: 'Apellido: ' , valor: proveedor.apellido },
      { campo: 'Correo: ' , valor: proveedor.correo },
      { campo: 'Comuna: ' , valor: proveedor.comunaNombre },
      { campo: 'Direccion: ' , valor: proveedor.direccion },
      { campo: 'Telefono: ' , valor: proveedor.telefonoCelular },
      { campo: 'Estado Persona: ' , valor: proveedor.estadoPersonaNombre },
      { campo: 'Tipo Persona: ' , valor: proveedor.tipoPersonaNombre },
      { campo: 'Estado Cliente: ' , valor: proveedor.estadoProveedorNombre },
      { campo: 'Nombre Usuario: ' , valor: proveedor.nombreUsuario },
      { campo: 'Estado Usuario: ' , valor: proveedor.estadoUsuarioNombre },
      { campo: 'Tipo Usuario: ' , valor: proveedor.tipoUsuarioNombre },
      { campo: 'Fecha Creacion: ' , valor: proveedor.fechaCreacion },
      { campo: 'Fecha Ultima edicion: ' , valor: proveedor.fechaUltimoUpdate }
    ];
    this.proveedorEditar = proveedor;
    this.resetFormularioEditar(this.proveedorEditar);
    // Servicio que abre el modal
    this.modalServiceNivelUno.open(content, options).result.then(result => {});
  }

  /**
   * Abre el modal de edicion del proveedor.
   * 
   * @param {*} content 
   * @memberof ProveedoresComponent
   */
  public openEditarProveedor(content: any) {
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
   * Abre el modal con el formulario para ingresar proveedores.
   * 
   * @param content contenido del modal
   * @memberof ProveedoresComponent
   */
  public openInsertarProveedor(content: any) {
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
   * Metodo que captura el evento submit del formulario insertar proveedor.
   *
   * @param {*} obj valores del formulario asociados al modelo.
   * @memberof ProveedoresComponent
   */
  public guardarProveedor(obj: any) {
    const proveedor = new ProveedorModel();
    const persona = new PersonaModel();
    const usuario = new UsuarioModel();
    proveedor.estadoProveedorId = 1;
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
            proveedor.personaId = personaId;
            /**
             * Insertamos el cliente
             */
            this.srvProveedor.guardarProveedor(proveedor).subscribe(
              respCliente => {
                usuario.personaId = personaId;
                /**
                 * Registramos al usuario.
                 */
                this.srvUsuario.guardarUsuario(usuario).subscribe(
                  respUsuario => {
                   
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
   * Crea un nuevo formulario para editar al proveedor y ademas antes lo resetea.
   * 
   * @private
   * @param {ProveedorCustomModel} proveedor 
   * @memberof ProveedoresComponent
   */
  private resetFormularioEditar(proveedor: ProveedorCustomModel): void {
    this.formEditarProveedor.reset();
    this.formEditarProveedor.controls['tipoPersona'].setValue(proveedor.tipoPersonaId);
    this.formEditarProveedor.controls['numId'].setValue(proveedor.rut.split('-')[0]);
    this.formEditarProveedor.controls['divId'].setValue(proveedor.rut.split('-')[1]);
    this.formEditarProveedor.controls['nombre'].setValue(proveedor.nombre);
    this.formEditarProveedor.controls['apellido'].setValue(proveedor.apellido);
    this.formEditarProveedor.controls['direccion'].setValue(proveedor.direccion);
    const comboPais = { code: proveedor.paisId , name: proveedor.paisNombre};
    this.onChangePais(comboPais);
    this.formEditarProveedor.controls['pais'].setValue(comboPais);
    const comboRegion = { code: proveedor.regionId , name: proveedor.regionNombre};
    this.onChangeRegion(comboRegion);
    this.formEditarProveedor.controls['region'].setValue(comboRegion);
    const comboProvincia = { code: proveedor.provinciaId , name: proveedor.provinciaNombre};
    this.onChangeProvincia(comboProvincia);
    this.formEditarProveedor.controls['provincia'].setValue(comboProvincia);
    const comboComuna = { code: proveedor.comunaId , name: proveedor.comunaNombre};
    this.formEditarProveedor.controls['comuna'].setValue(comboComuna);
    this.formEditarProveedor.controls['telefonoFijo'].setValue(proveedor.telefonoFijo);
    this.formEditarProveedor.controls['telefonoCelular'].setValue(proveedor.telefonoCelular);
    this.formEditarProveedor.controls['correo'].setValue(proveedor.correo);
    const datePipe = new DatePipe('en-US');
    const fechaArray: string[] = datePipe.transform(proveedor.fechaNacimiento, 'dd/MM/yyyy').split('/');
    const fecha = new Date(Number.parseInt(fechaArray[2]), Number.parseInt(fechaArray[1]) - 1, Number.parseInt(fechaArray[0]) );
    this.formEditarProveedor.controls['fechaNacimiento'].setValue(fecha);
    this.formEditarProveedor.controls['estadoClienteId'].setValue(proveedor.estadoProveedorId);
  }

  /**
   * 
   * Evento que se ejecuta cuando se edita un proveedor dentro del sistema.
   * 
   * @param {any} proveedor proveedor que viene del formularo
   * @memberof ProveedoresComponent
   */
  public editarProveedor (proveedor: any): void {
    proveedor.proveedorId = this.proveedorEditar.proveedorId;
    proveedor.personaId = this.proveedorEditar.personaId;
    this.srvProveedor.editarProveedor(proveedor).subscribe(
      resp => {
        this.srvPersona.editarPersona(proveedor).subscribe(
          respPersona => {

        });
      }
    );
  }
}
