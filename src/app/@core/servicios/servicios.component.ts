import { ServicioPorDiagnosticoModel } from './../../@model/aplicacion/servicio-por-diagnostico.model';
import { DatePipe } from '@angular/common';
import { ReservaHoraModel } from './../../@model/aplicacion/reserva-hora.model';
import { ClienteService } from './../../@services/aplicacion/cliente.service';
import { ComboService } from './../../@services/util/combo.service';
import { ComboModel } from './../../@model/util/combo.model';
import { es } from './../../app.config';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosCustomModel } from './../../@model/custom/servicios-custom.model';
import { ServiciosService } from './../../@services/aplicacion/servicios.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { UsuarioService } from '../../@services/aplicacion/usuario.service';
import { ReservaHoraService } from '../../@services/aplicacion/reserva-hora.service';

declare var html2pdf;
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  public servicios: ServiciosCustomModel[];
  public total = 0;
  public totalCargo = 0;
  public serviciosSolicitados: ServiciosCustomModel[];
  public items: MenuItem[];
  public activeIndex = 0;
  public events: any[];
  public header: any;
  public es: any;
  public calendarValue: any;
  public sucursalValue: any;
  public vehiculoValue: any;
  public comboSucursal: ComboModel[];
  public comboVehiculo: ComboModel[];
  public validarSiguiente = true;
  public minDate: Date;

  constructor(
    private srvServicios: ServiciosService,
    private modalService: NgbModal,
    private srvCombo: ComboService,
    private srvUsuario: UsuarioService,
    private srvCliente: ClienteService,
    private srvReserva: ReservaHoraService
  ) {
  }

  ngOnInit() {
    this.minDate = new Date();
    this.serviciosSolicitados = [];
    this.es = es;
    this.events = [];
    this.header = {};
    this.cargarPaginacion();
    this.srvServicios.getTodosLosServicios().subscribe(
      resp => {
        this.servicios = resp.body.data;
      }
    );
  }

  seleccion(item: ServiciosCustomModel, event: any): void {
    if (event) {
      this.total += item.costo;
      this.totalCargo += (item.costo + (item.costo * item.valorCalculado));
      this.serviciosSolicitados.push(item);
    } else {
      this.total -= item.costo;
      this.totalCargo -= (item.costo + (item.costo * item.valorCalculado));
      if ( this.serviciosSolicitados.indexOf(item) !== -1 ) {
        this.serviciosSolicitados.splice(this.serviciosSolicitados.indexOf(item), 1);
      }
    }
  }

  
  private cargarPaginacion(): void {
    this.items = [{
      label: 'Lista de servicios',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Pedir Hora',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    },
    {
      label: 'Confirmar',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    },
    {
      label: 'Comprobante',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    }
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
    this.modalService.open(content, options).result.then(result => {
      this.activeIndex = 0;
    }, (reason) => {
      this.activeIndex = 0;
    });
  }

  changeCalendar(event: any) {
    if (this.calendarValue != null && this.vehiculoValue != null && this.sucursalValue != null) {
      this.validarSiguiente = true;
    }
  }
  changeSucursal(event: any) {
    if (this.calendarValue != null && this.vehiculoValue != null && this.sucursalValue != null) {
      this.validarSiguiente = true;
    }
  }
  changeVehiculo(event: any) {
    if (this.calendarValue != null && this.vehiculoValue != null && this.sucursalValue != null) {
      this.validarSiguiente = true;
    }
  }


  public siguiente (): void {
    this.activeIndex ++;
    if (this.activeIndex === 0) {
        this.validarSiguiente = true;
    } else if (this.activeIndex === 1) {
      this.validarSiguiente = false;
      this.srvCombo.getComboSucursal().subscribe(resp => this.comboSucursal = resp.body.data);
      const cbo = new ComboModel();
      cbo.name = this.srvUsuario.getUsername();
      this.srvCombo.getVechiculoPorUsuario(cbo).subscribe(resp => this.comboVehiculo = resp.body.data);
      
    } else if (this.activeIndex === 3) {
      this.validarSiguiente = true;
      this.srvCliente.buscarClientePorNombre(this.srvUsuario.getUsername()).subscribe(
        resp => {
          const idCliente = resp.body.data.idCliente;
          const r = new ReservaHoraModel();
          r.clienteId = idCliente;
          r.empleadoId = 4;
          r.sucursalId = this.sucursalValue.code;
          r.vehiculoId = this.vehiculoValue.code;
          const datePipe = new DatePipe('en-US');
          const fechaArray: string[] = datePipe.transform(this.calendarValue, 'dd/MM/yyyy').split('/');
          const fecha = new Date(Number.parseInt(fechaArray[2]), Number.parseInt(fechaArray[1]) - 1, Number.parseInt(fechaArray[0]) );
          r.fechaReserva = fecha;
          r.estadoReservaId = 1;
          r.tipoReservaId = 1 ;
          this.srvReserva.guardarReservaHora(r).subscribe(
            respGuardarHora => {
                const serv: ServicioPorDiagnosticoModel = respGuardarHora.body.data;
                this.serviciosSolicitados.map(item => {
                  serv.idServicio = item.servicioId;
                  serv.idEstado = 1;
                  this.srvReserva.guardarServicioPorDiagnostico(serv).subscribe(
                    resp2 => {
                      console.log('Servicio Guardado');
                    }
                  );
                });
            }
          );

        }
      );
      
    } else if (this.activeIndex === 4) {
      alert('Sus servicios han sido contratados');
    }
  }

  public testPDF(): void {
    const pipe = new DatePipe('en-US');
    const fecha = new Date();
 //   $("#testPrint").attr("hidden", false);
    const element = document.getElementById('testPrint');
    html2pdf(element, {
        margin:       10,
        filename: 'Comprovante ' + pipe.transform(fecha, 'MM-dd-yyyy') + '.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { dpi: 192, letterRendering: false },
        jsPDF:        { unit: 'mm', format: 'letter', orientation: 'landscape' }
      });
}

}
