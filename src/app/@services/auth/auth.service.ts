import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    private token: string;
    private isAuthentication: boolean;
    private role: string;
    private username: string;

    constructor(private htpp: HttpClient, private route: Router) {
        this.validarToken();
    }

    private validarToken () {
        const token: string = localStorage.getItem('token');
        if (token === null) {
            this.role = '';
            this.username = '';
            this.isAuthentication = false;
        } else {
            this.isAuthentication = true;
        }
    }

    public isAutenticate(): boolean {
        return this.isAuthentication;
    }

    public getRole (): string {
        return this.role;
    }

    public getUsername(): string {
        return this.username;
    }

    public redirecLoging () {
        if ( this.isAutenticate() ) {
            //this.route.navigate(['/panel']);
        } else {
            //this.route.navigate(['/login']);
        }
    }
}
