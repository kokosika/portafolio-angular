import { NavbarComponent } from './../shared/navbar/navbar.component';
import { UsuarioService } from './../@services/aplicacion/usuario.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  @ViewChild(NavbarComponent) navbar: NavbarComponent;
  public isAuthenticate = false;

  constructor(private router: Router, private srvUsuario: UsuarioService, public location: Location, private element: ElementRef) {
    this.navbar = new NavbarComponent(location, element, srvUsuario);
    this.navbar.ngOnInit();
    this.isAuthenticate = this.srvUsuario.isAutenticate();
  }

  ngOnInit() {
    console.log(this.srvUsuario.isAutenticate());
    this.isAuthenticate = this.srvUsuario.isAutenticate();
  }

  public loginRedirigir(): void {
    this.router.navigate(['login']);
  }

}
