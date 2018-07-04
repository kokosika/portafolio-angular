import { UsuarioService } from './../../@services/aplicacion/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private srvUsuario: UsuarioService) {
    console.log('entre');
    this.srvUsuario.resetCuenta();
  }

  ngOnInit() {
    this.srvUsuario.resetCuenta();
  }

}
