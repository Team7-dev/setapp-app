import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Unidade} from '../../../../model/unidade';
import {UnidadeService} from '../../unidade.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InComponent} from '../../../../model/in-component';

@Component({
    templateUrl: 'unidade-detalhar.component.html'
})
export class UnidadeDetalharComponent extends InComponent implements OnInit {

    public unidade: Unidade;

    constructor(public unidadeService: UnidadeService, private router: Router, private activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
        super();

        const id = this.activatedRoute.snapshot.params['id'];

        if (!this.unidadeService.unidade) {
            this.recuperarUnidade(id);
            return;
        }

        this.unidade = this.unidadeService.unidade;
    }

    ngOnInit() {
    }

    recuperarUnidade(id: number) {
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

}
