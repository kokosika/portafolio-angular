import { NavbarComponent } from './../../shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-bueno',
  templateUrl: './login-bueno.component.html',
  styleUrls: ['./login-bueno.component.css']
})
export class LoginBuenoComponent implements OnInit {
  @ViewChild(NavbarComponent) nav: NavbarComponent;
  constructor(private router: Router) {
    this.router.navigate(['']);
   }

  ngOnInit() {
    this.router.navigate(['']);
  }

}
