import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Correspondencia} from '../../../../model/correspondencia';
import {CorrespondenciaService} from '../../correspondencia.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InComponent} from '../../../../model/in-component';

@Component({
    templateUrl: 'correspondencia-detalhar.component.html'
})
export class CorrespondenciaDetalharComponent extends InComponent implements OnInit {

    public correspondencia: Correspondencia;

    constructor(public correspondenciaService: CorrespondenciaService, private router: Router, private activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
        super();

        const id = this.activatedRoute.snapshot.params['id'];

        if (!this.correspondenciaService.correspondencia) {
            this.recuperarCorrespondencia(id);
            return;
        }

        this.correspondencia = this.correspondenciaService.correspondencia;
    }

    ngOnInit() {
    }

    recuperarCorrespondencia(id: number) {
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

}
