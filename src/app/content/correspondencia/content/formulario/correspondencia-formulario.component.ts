import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Correspondencia} from '../../../../model/correspondencia';
import {ActivatedRoute, Router} from '@angular/router';
import {CorrespondenciaService} from '../../correspondencia.service';
import {InComponent} from '../../../../model/in-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Usuario} from '../../../../model/usuario';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {map, startWith, take} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {UsuarioService} from '../../../usuario/usuario.service';
import {now} from 'moment';

@Component({
    templateUrl: './correspondencia-formulario.component.html',
})
export class CorrespondenciaFormularioComponent extends InComponent implements OnInit {

    @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

    title: string;
    public correspondencia: Correspondencia = new Correspondencia();
    dateControl = new FormControl(now());
    myControl = new FormControl();
    options: Usuario[] = [];
    filteredOptions: Observable<Usuario[]>;

    constructor(public correspondenciaService: CorrespondenciaService, private router: Router, public activatedRoute: ActivatedRoute, public snackBar: MatSnackBar, private _ngZone: NgZone, public usuarioService: UsuarioService) {
        super();

        this.activatedRoute.data.subscribe(
            result => {
                this.title = result.title;
            }
        );

        if (this.correspondenciaService.correspondencia) {
            this.correspondencia = this.correspondenciaService.correspondencia;
            return;
        }

        const id = this.activatedRoute.snapshot.params['id'];

        if (id) {
            this.carregarCorrespondencia(id);
        }
    }

    ngOnInit() {
        if (!this.activatedRoute.snapshot.params['id']) {
            this.correspondencia.usuario = new Usuario();
        }

        this.recuperarUsuario();

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

    displayFnDate(correspondencia) {
        return correspondencia.dataHoraRecebida;
    }

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    carregarCorrespondencia(id: number) {
        this.correspondenciaService.getCorrespondencia(id).subscribe(
            result => {
                this.correspondencia.fromObject(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
                this.router.navigate(['/correspondencia']);
            }
        )
    }

    salvarCorrespondencia() {
        if (this.correspondencia.id) {
            this.correspondencia.dataHoraCadastro = new Date();
            this.atualizarCorrespondencia();
        } else {
            this.correspondencia.dataHoraCadastro = new Date();
            this.correspondencia.situacao = 'PENDENTE';
            this.cadastrarCorrespondencia();
        }
    }

    cadastrarCorrespondencia() {
        this.correspondenciaService.postCorrespondencia(this.correspondencia).subscribe(
            result => {
                this.snackBar.open('Correspondencia cadastrado com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/correspondencia']);
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

    private atualizarCorrespondencia() {
        this.correspondenciaService.putCorrespondencia(this.correspondencia).subscribe(
            result => {
                this.snackBar.open('Correspondencia alterado com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/correspondencia']);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

}
