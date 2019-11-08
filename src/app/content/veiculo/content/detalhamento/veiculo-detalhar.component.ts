import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VeiculoService} from '../../veiculo.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InComponent} from '../../../../model/in-component';
import {Veiculo} from '../../../../model/veiculo';

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
                this.snackBar.open('Não foi possivel recuperar o veículo, tente novamente!', 'Close', {duration: 5000});
                this.router.navigate(['/veiculo']);
            }
        )
    }

}
