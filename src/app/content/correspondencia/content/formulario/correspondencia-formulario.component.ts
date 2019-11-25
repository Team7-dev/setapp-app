import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Correspondencia} from '../../../../model/correspondencia';
import {ActivatedRoute, Router} from '@angular/router';
import {CorrespondenciaService} from '../../correspondencia.service';
import {InComponent} from '../../../../model/in-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Usuario} from '../../../../model/usuario';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
    templateUrl: './correspondencia-formulario.component.html',
})
export class CorrespondenciaFormularioComponent extends InComponent implements OnInit {

    @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

    public correspondencia: Correspondencia = new Correspondencia();
    title: string;

    constructor(public correspondenciaService: CorrespondenciaService, private router: Router, public activatedRoute: ActivatedRoute, public snackBar: MatSnackBar, private _ngZone: NgZone) {
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
            this.correspondencia.situacao = 'ATIVO';
            this.atualizarCorrespondencia();
        } else {
            this.correspondencia.dataHoraCadastro = new Date();
            this.correspondencia.situacao = 'ATIVO';
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
