import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Veiculo} from '../../../../model/veiculo';
import {VeiculoService} from '../../veiculo.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InComponent} from '../../../../model/in-component';

@Component({
    templateUrl: 'veiculo-detalhar.component.html'
})
export class VeiculoDetalharComponent extends InComponent implements OnInit {

    public veiculo: Veiculo;

    constructor(public veiculoService: VeiculoService, private router: Router, private activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
        super();

        const id = this.activatedRoute.snapshot.params['id'];

        if (!this.veiculoService.veiculo) {
            this.recuperarVeiculo(id);
            return;
        }

        this.veiculo = this.veiculoService.veiculo;
    }

    ngOnInit() {
    }

    recuperarVeiculo(id: number) {
        this.veiculoService.getVeiculo(id).subscribe(
            result => {
                this.veiculo.fromObject(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
                this.router.navigate(['/veiculo']);
            }
        )
    }

}
