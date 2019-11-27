import {Component, OnInit} from '@angular/core';
import {Unidade} from '../../../../model/unidade';
import {ActivatedRoute, Router} from '@angular/router';
import {UnidadeService} from '../../unidade.service';
import {InComponent} from '../../../../model/in-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsuarioService} from '../../../usuario/usuario.service';
import {Usuario} from '../../../../model/usuario';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    templateUrl: './unidade-formulario.component.html',
})
export class UnidadeFormularioComponent extends InComponent implements OnInit {

    title: string;
    public unidade: Unidade = new Unidade();
    myControl = new FormControl();
    options: Usuario[] = [];
    filteredOptions: Observable<Usuario[]>;

    constructor(public unidadeService: UnidadeService, private router: Router, public activatedRoute: ActivatedRoute, public snackBar: MatSnackBar, public usuarioService: UsuarioService) {
        super();

        this.activatedRoute.data.subscribe(
            result => {
                this.title = result.title;
            }
        );

        if (this.unidadeService.unidade) {
            this.unidade = this.unidadeService.unidade;
            return;
        }

        const id = this.activatedRoute.snapshot.params['id'];

        if (id) {
            this.carregarUnidade(id);
        }
    }

    ngOnInit() {
        if (!this.activatedRoute.snapshot.params['id']) {
            this.unidade.usuario = new Usuario();
        }
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    private _filter(value: string): Usuario[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.nome.toLowerCase().includes(filterValue));
    }

    displayFn(usuario) {
        return usuario.nome;
    }

    carregarUnidade(id: number) {
        this.unidadeService.getUnidade(id).subscribe(
            result => {
                this.unidade.fromObject(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
                this.router.navigate(['/unidade']);
            }
        )
    }

    salvarUnidade() {
        if (this.unidade.id) {
            this.unidade.dataHoraCadastro = new Date();
            this.unidade.bloco.toUpperCase();
            this.atualizarUnidade();
        } else {
            this.unidade.dataHoraCadastro = new Date();
            this.unidade.bloco.toUpperCase();
            this.cadastrarUnidade();
        }
    }

    cadastrarUnidade() {
        this.unidadeService.postUnidade(this.unidade).subscribe(
            result => {
                this.snackBar.open('Unidade cadastrada com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/unidade']);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    recuperarUsuario() {
        this.usuarioService.getUsuariosActives().subscribe(
            result => {
                this.options = [];
                let usuario: Usuario;
                for (let i = 0; i < result.length; i++) {
                    usuario = new Usuario();
                    usuario.fromObject(result[i]);
                    this.options.push(usuario);
                }
                console.log(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    private atualizarUnidade() {
        this.unidadeService.putUnidade(this.unidade).subscribe(
            result => {
                this.snackBar.open('Unidade alterada com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/unidade']);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }
}
