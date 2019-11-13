import {Component, Injectable, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {Usuario} from '../../model/usuario';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-home',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public usuario: Usuario = new Usuario();

    constructor(public loginService: LoginService, private router: Router, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        if (localStorage.getItem('access_token') !== undefined) {
            // pegar informações do usuario e salvar em LoginService.
            this.loginService.usuario = localStorage.getItem('usuario');
        }
    }

    public login() {
        this.loginService.doLogin(this.usuario).subscribe(
            result => {
                localStorage.setItem('access_token', result);
                localStorage.setItem('usuario', this.usuario.usuario);
                this.router.navigate(['/']);
            },
            error => {
                this.snackBar.open('Não foi possível realizar o login, verifique seus dados!', 'Fechar', {duration: 5000});
            }
        );
    }
}
