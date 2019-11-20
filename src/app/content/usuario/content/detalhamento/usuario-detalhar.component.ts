import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Usuario} from '../../../../model/usuario';
import {UsuarioService} from '../../usuario.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InComponent} from '../../../../model/in-component';

@Component({
    templateUrl: 'usuario-detalhar.component.html'
})
export class UsuarioDetalharComponent extends InComponent implements OnInit {

    public usuario: Usuario;

    constructor(public usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
        super();

        const id = this.activatedRoute.snapshot.params['id'];

        if (!this.usuarioService.usuario) {
            this.recuperarUsuario(id);
            return;
        }

        this.usuario = this.usuarioService.usuario;
    }

    ngOnInit() {
    }

    recuperarUsuario(id: number) {
        this.usuarioService.getUsuario(id).subscribe(
            result => {
                this.usuario.fromObject(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
                this.router.navigate(['/usuario']);
            }
        )
    }

}
