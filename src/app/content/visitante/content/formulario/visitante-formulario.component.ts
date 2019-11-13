import {Component, OnInit} from '@angular/core';
import {Visitante} from '../../../../model/visitante';
import {ActivatedRoute, Router} from '@angular/router';
import {VisitanteService} from '../../visitante.service';
import {InComponent} from '../../../../model/in-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Unidade} from '../../../../model/unidade';

@Component({
    templateUrl: './visitante-formulario.component.html',
})
export class VisitanteFormularioComponent extends InComponent implements OnInit {

    public visitante: Visitante = new Visitante();

    title: string;

    constructor(public visitanteService: VisitanteService, private router: Router, public activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
        super();

        this.activatedRoute.data.subscribe(
            result => {
                this.title = result.title;
            }
        );

        if (this.visitanteService.visitante) {
            this.visitante = this.visitanteService.visitante;
            return;
        }

        const id = this.activatedRoute.snapshot.params['id'];

        if (id) {
            this.carregarVisitante(id);
        }


    }

    ngOnInit() {
        if(!this.activatedRoute.snapshot.params['id']) {
            this.visitante.unidade = new Unidade();
        }
    }

    carregarVisitante(id: number) {
        this.visitanteService.getVisitante(id).subscribe(
            result => {
                this.visitante.fromObject(result);
            },
            error => {
                this.snackBar.open('Não foi possivel recuperar visitante, tente novamente!', 'X', {duration: 5000});
                this.router.navigate(['/visitante']);
            }
        )
    }

    salvarVisitante() {
        if (this.visitante.id) {
            this.visitante.dataHoraCadastro = new Date();
            this.visitante.situacao = 'ATIVO';
            this.atualizarVisitante();
        } else {
            this.visitante.dataHoraCadastro = new Date();
            this.visitante.situacao = 'ATIVO';
            this.cadastrarVisitante();
        }
    }

    cadastrarVisitante() {
        this.visitanteService.postVisitante(this.visitante).subscribe(
            result => {
                this.snackBar.open('Visitante cadastrado com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/visitante']);
            },
            error => {
                console.log(error);
                this.snackBar.open('Não foi possivel cadastrar visitante, verifique os dados e tente novamente!', 'X', {duration: 5000});
            }
        )
    }

    private atualizarVisitante() {
        this.visitanteService.putVisitante(this.visitante).subscribe(
            result => {
                this.snackBar.open('Visitante alterado com sucesso!', 'Close', {duration: 5000});
                this.router.navigate(['/visitante']);
            },
            error => {
                this.snackBar.open('Não foi possivel atualizar visitante, verifique os dados e tente novamente!', 'X', {duration: 5000});
            }
        )
    }
}
