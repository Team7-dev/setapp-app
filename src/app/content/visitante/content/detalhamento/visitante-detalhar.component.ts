import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Visitante} from '../../../../model/visitante';
import {VisitanteService} from '../../visitante.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InComponent} from '../../../../model/in-component';

@Component({
    templateUrl: 'visitante-detalhar.component.html'
})
export class VisitanteDetalharComponent extends InComponent implements OnInit {

    public visitante: Visitante;

    constructor(public visitanteService: VisitanteService, private router: Router, private activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
        super();

        const id = this.activatedRoute.snapshot.params['id'];

        if (!this.visitanteService.visitante) {
            this.recuperarVisitante(id);
            return;
        }

        this.visitante = this.visitanteService.visitante;
    }

    ngOnInit() {
    }

    recuperarVisitante(id: number) {
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

}
