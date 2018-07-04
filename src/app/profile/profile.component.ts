import { DatePipe } from '@angular/common';
import { ClienteCustomModel } from './../@model/custom/cliente-custom.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModel } from './../@model/aplicacion/usuario.model';
import { PersonaModel } from './../@model/aplicacion/persona.model';
import { ClienteModel } from './../@model/aplicacion/cliente.model';
import { ComboService } from './../@services/util/combo.service';
import { es } from './../app.config';
import { UsuarioService } from './../@services/aplicacion/usuario.service';
import { ClienteService } from './../@services/aplicacion/cliente.service';
import { PersonaService } from './../@services/aplicacion/persona.service';
import { VehiculoService } from './../@services/aplicacion/vehiculo.service';
import { ComboModel } from './../@model/util/combo.model';
import { VehiculoModel } from './../@model/aplicacion/vehiculo.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  public formPerfil: FormGroup;
  public es: any;
  public colsVehiculos: any;
  public data: VehiculoModel[];
  private dataTemporal: VehiculoModel[];
  public formInsertarVehiculo: FormGroup;
  public comboPais: ComboModel[];
  public comboRegion: ComboModel[];
  public comboProvincia: ComboModel[];
  public comboComuna: ComboModel[];
  public comboMarcaVehiculo: ComboModel[];
  public comboModeloVehiculo: ComboModel[];
  public cliente: ClienteCustomModel;
  public anadirVehiculo = false;
  public vehiculoData: VehiculoModel[];
  public vehiculoDataTemporal: VehiculoModel[];


  constructor(
    private srvCombo: ComboService,
    private fb: FormBuilder,
    private srvVehiculo: VehiculoService,
    private srvPersona: PersonaService,
    private srvCliente: ClienteService,
    private srvUsuario: UsuarioService,
    private modalService: NgbModal,
  ) {
    this.formPerfil = this.fb.group({
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
      comuna: [null]
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
    this.data = [];
    this.dataTemporal = [];
    this.vehiculoData = [];
    this.vehiculoDataTemporal = [];

    }

  ngOnInit() {
    this.buscarClientePorNombre();
    this.data = [];
    this.dataTemporal = [];
    this.vehiculoData = [];
    this.vehiculoDataTemporal = [];
    this.inicializarCalendar();
    this.llenarCombos();
    this.iniciarColumnasTablaVehiculo();
  }

  private buscarClientePorNombre (): void {
    this.srvCliente.buscarClientePorNombre(this.srvUsuario.getUsername()).subscribe(
      resp => {
        this.cliente = resp.body.data;
        console.log(this.cliente);
        this.formPerfil.reset();
        this.formPerfil.controls['tipoPersona'].setValue(this.cliente.tipoPersonaId);
        this.formPerfil.controls['numId'].setValue(this.cliente.rut.split('-')[0]);
        this.formPerfil.controls['divId'].setValue(this.cliente.rut.split('-')[1]);
        this.formPerfil.controls['nombre'].setValue(this.cliente.nombre);
        this.formPerfil.controls['apellido'].setValue(this.cliente.apellido);
        this.formPerfil.controls['direccion'].setValue(this.cliente.direccion);
        const comboPais = { code: this.cliente.paisId , name: this.cliente.paisNombre};
        this.onChangePais(comboPais);
        this.formPerfil.controls['pais'].setValue(comboPais);
        const comboRegion = { code: this.cliente.regionId , name: this.cliente.regionNombre};
        this.onChangeRegion(comboRegion);
        this.formPerfil.controls['region'].setValue(comboRegion);
        const comboProvincia = { code: this.cliente.provinciaId , name: this.cliente.provinciaNombre};
        this.onChangeProvincia(comboProvincia);
        this.formPerfil.controls['provincia'].setValue(comboProvincia);
        const comboComuna = { code: this.cliente.comunaId , name: this.cliente.comunaNombre};
        this.formPerfil.controls['comuna'].setValue(comboComuna);
        this.formPerfil.controls['telefonoFijo'].setValue(this.cliente.telefonoFijo);
        this.formPerfil.controls['telefonoCelular'].setValue(this.cliente.telefonoCelular);
        this.formPerfil.controls['correo'].setValue(this.cliente.correo);
        const datePipe = new DatePipe('en-US');
        const fechaArray: string[] = datePipe.transform(this.cliente.fechaNacimiento, 'dd/MM/yyyy').split('/');
        const fecha = new Date(Number.parseInt(fechaArray[2]), Number.parseInt(fechaArray[1]) - 1, Number.parseInt(fechaArray[0]) );
        this.formPerfil.controls['fechaNacimiento'].setValue(fecha);
        this.buscarVehiculosPorIdCliente(this.cliente.idCliente);
      }
    );
  }

  public iniciarColumnasTablaVehiculo(): void {
    this.colsVehiculos = [
      { field: 'patente', header: 'Patente' },
      { field: 'marcaVehiculoNombre', header: 'Marca' },
      { field: 'tipoVehiculoNombre', header: 'Tipo' },
      { field: 'fechaCreacion', header: 'Fecha Creacion' }
    ];
  }
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
  private inicializarCalendar(): void {
    this.es = es;
  }

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

  public openIngresarVehiculos(): void {
    this.anadirVehiculo = !this.anadirVehiculo;
  }

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

  private buscarVehiculosPorIdCliente(clienteId: number) {
    this.srvVehiculo.buscarVehiculosPorIdCliente(clienteId).subscribe(
      resp => {
        this.vehiculoData = resp.body.data;
      }
    );
  }

  public editarCliente (cliente: any): void {
    cliente.idCliente = this.cliente.idCliente;
    cliente.idPersona = this.cliente.idPersona;
    cliente.estadoClienteId = 1;
    this.srvCliente.editarCliente(cliente).subscribe(
      resp => {
        cliente.personaId = this.cliente.idPersona;
        this.srvPersona.editarPersona(cliente).subscribe(
          respPersona => {
            this.vehiculoDataTemporal.map((vehiculo) => {
              const vehiculoDto = new VehiculoModel();
              vehiculoDto.clienteId = this.cliente.idCliente;
              vehiculoDto.marcaVehiculoId = vehiculo.marcaVehiculoId;
              vehiculoDto.tipoVehiculoId = vehiculo.tipoVehiculoId;
              vehiculoDto.patente = vehiculo.patente;
              this.srvVehiculo.guardarVehiculo(vehiculoDto).subscribe(
                respVehiculo => {
                  this.buscarVehiculosPorIdCliente(this.cliente.idCliente);
                }
              );
            });
              this.vehiculoDataTemporal = [];
              alert('Su perfil fue editado con exito');
              this.buscarClientePorNombre();
          }
        );
      }
    );
  }
}
