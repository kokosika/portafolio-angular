import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CoreModule } from './@core/core.module';
import { ServicesModule } from './@services/services.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from './ng-prime.module';
import { ServiciosContratadosComponent } from './servicios-contratados/servicios-contratados.component';

@NgModule({
   declarations: [
      AppComponent,
      SignupComponent,
      LandingComponent,
      ProfileComponent,
      NavbarComponent,
      FooterComponent,
      ServiciosContratadosComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    NgPrimeModule,
    ServicesModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
