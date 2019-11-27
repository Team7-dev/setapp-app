import {Component, OnInit} from '@angular/core';
import {Assembleia} from '../../../../model/assembleia';
import {ActivatedRoute, Router} from '@angular/router';
import {AssembleiaService} from '../../assembleia.service';
import {InComponent} from '../../../../model/in-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Unidade} from '../../../../model/unidade';

@Component({
    templateUrl: './assembleia-formulario.component.html',
})
export class AssembleiaFormularioComponent extends InComponent {

    public assembleia: Assembleia = new Assembleia();
    title: string;

    constructor(public assembleiaService: AssembleiaService, private router: Router, public activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
        super();

        this.activatedRoute.data.subscribe(
            result => {
                this.title = result.title;
            }
        );

        if (this.assembleiaService.assembleia) {
            this.assembleia = this.assembleiaService.assembleia;
            return;
        }

        const id = this.activatedRoute.snapshot.params['id'];

        if (id) {
            this.carregarAssembleia(id);
        }
    }

    // ngOnInit() {
    //     if (!this.activatedRoute.snapshot.params['id']) {
    //         this.assembleia.unidade = new Unidade();
    //     }
    // }

    carregarAssembleia(id: number) {
        this.assembleiaService.getAssembleia(id).subscribe(
            result => {
                this.assembleia.fromObject(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
                this.router.navigate(['/assembleia']);
            }
        )
    }

    salvarAssembleia() {
        if (this.assembleia.id) {
            this.assembleia.dataHoraCadastro = new Date();
            this.assembleia.situacao = 'ATIVO';
            this.atualizarAssembleia();
        } else {
            this.assembleia.dataHoraCadastro = new Date();
            this.assembleia.situacao = 'ATIVO';
            this.cadastrarAssembleia();
        }
    }

    cadastrarAssembleia() {
        this.assembleiaService.postAssembleia(this.assembleia).subscribe(
            result => {
                this.snackBar.open('Assembleia cadastrado com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/assembleia']);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    private atualizarAssembleia() {
        this.assembleiaService.putAssembleia(this.assembleia).subscribe(
            result => {
                this.snackBar.open('Assembleia alterado com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/assembleia']);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }
}
