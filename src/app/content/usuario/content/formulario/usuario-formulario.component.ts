import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../../../model/usuario';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../usuario.service';
import {InComponent} from '../../../../model/in-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Perfil} from '../../../../model/perfil';

@Component({
    templateUrl: './usuario-formulario.component.html',
})
export class UsuarioFormularioComponent extends InComponent implements OnInit {

    public usuario: Usuario = new Usuario();
    title: string;

    constructor(public usuarioService: UsuarioService, private router: Router, public activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
        super();

        this.activatedRoute.data.subscribe(
            result => {
                this.title = result.title;
            }
        );

        if (this.usuarioService.usuario) {
            this.usuario = this.usuarioService.usuario;
            return;
        }

        const id = this.activatedRoute.snapshot.params['id'];

        if (id) {
            this.carregarUsuario(id);
        }
    }

    ngOnInit() {
        if (!this.activatedRoute.snapshot.params['id']) {
            this.usuario.perfil = new Perfil();
        }
    }

    carregarUsuario(id: number) {
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

    salvarUsuario() {
        if (this.usuario.id) {
            this.usuario.dataHoraCadastro = new Date();
            this.usuario.situacao = 'ATIVO';
            this.atualizarUsuario();
        } else {
            this.usuario.dataHoraCadastro = new Date();
            this.usuario.situacao = 'ATIVO';
            this.cadastrarUsuario();
        }
    }

    cadastrarUsuario() {
        this.usuarioService.postUsuario(this.usuario).subscribe(
            result => {
                this.snackBar.open('Usuario cadastrado com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/usuario']);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    private atualizarUsuario() {
        this.usuarioService.putUsuario(this.usuario).subscribe(
            result => {
                this.snackBar.open('Usuario alterado com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/usuario']);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

}
