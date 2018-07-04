import { DetalleServiciosModel } from './../@model/custom/detalle-servicios.model';
import { ReservaHoraService } from './../@services/aplicacion/reserva-hora.service';
import { Component, OnInit } from '@angular/core';
import { ReserCustomModel } from '../@model/custom/reserva-custom.model';

@Component({
  selector: 'app-servicios-contratados',
  templateUrl: './servicios-contratados.component.html',
  styleUrls: ['./servicios-contratados.component.css']
})
export class ServiciosContratadosComponent implements OnInit {
  
  public reservaCliente: ReserCustomModel[];
  public detalleServicio: DetalleServiciosModel[];
  public cols: any;
  public colsDetalle: any;

  constructor(
    private srvReserva: ReservaHoraService
  ) { }

  ngOnInit() {
    this.getReservaCliente();
    this.cols = [
      { field: 'reservaId', header: 'N° Comprobante' },
      { field: 'fechaResarva', header: 'Fecha Reserva' },
      { field: 'patente', header: 'Patente' },
      { field: 'tipoVehiculoNombre', header: 'Marca Vehiculo' },
      { field: 'marcaVehiculoNombre', header: 'Modelo Vehiculo' },
      { field: 'sucursalNombre', header: 'Sucursal' }
    ];

    this.colsDetalle = [
      { field: 'tipoServicioNombre', header: 'Servicio' },
      { field: 'costo', header: 'Costo' },
      { field: 'porcentaje', header: 'Porcentaje' },
      { field: 'totalServicio', header: 'Total Servicio' }
    ];
  }

  private getReservaCliente(): void {
      this.srvReserva.getReservasCliente().subscribe(
        resp => {
          this.reservaCliente = resp.body.data;
        }
      );
  }

  public obtenerIdTablaServicios (reserva: any): void {
    this.detalleServicio = [];
    this.srvReserva.getDetalleServicio(reserva.diagnosticoId).subscribe(
      resp => {
        this.detalleServicio = resp.body.data;
      }
    );
  }

}
