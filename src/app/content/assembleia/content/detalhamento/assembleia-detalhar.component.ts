import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Assembleia} from '../../../../model/assembleia';
import {AssembleiaService} from '../../assembleia.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InComponent} from '../../../../model/in-component';

@Component({
    templateUrl: 'assembleia-detalhar.component.html'
})
export class AssembleiaDetalharComponent extends InComponent implements OnInit {

    public assembleia: Assembleia;

    constructor(public assembleiaService: AssembleiaService, private router: Router, private activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
        super();

        const id = this.activatedRoute.snapshot.params['id'];

        if (!this.assembleiaService.assembleia) {
            this.recuperarAssembleia(id);
            return;
        }

        this.assembleia = this.assembleiaService.assembleia;
    }

    ngOnInit() {
    }

    recuperarAssembleia(id: number) {
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

}
