import {Component, OnInit} from '@angular/core';
import {Veiculo} from '../../../../model/veiculo';
import {ActivatedRoute, Router} from '@angular/router';
import {VeiculoService} from '../../veiculo.service';
import {InComponent} from '../../../../model/in-component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    templateUrl: './veiculo-formulario.component.html',
})
export class VeiculoFormularioComponent extends InComponent implements OnInit {

    public veiculo: Veiculo = new Veiculo();
    title: string;

    constructor(public veiculoService: VeiculoService, private router: Router, public activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
        super();

        this.activatedRoute.data.subscribe(
            result => {
                this.title = result.title;
            }
        );

        if (this.veiculoService.veiculo) {
            this.veiculo = this.veiculoService.veiculo;
            return;
        }

        const id = this.activatedRoute.snapshot.params['id'];

        if (id) {
            this.carregarVeiculo(id);
        }

    }

    ngOnInit() {
    }

    carregarVeiculo(id: number) {
        this.veiculoService.getVeiculo(id).subscribe(
            result => {
                this.veiculo.fromObject(result);
            },
            error => {
                this.snackBar.open('Não foi possivel recuperar veiculo, tente novamente!', 'Close', {duration: 5000});
                this.router.navigate(['/veiculo']);
            }
        )
    }

    salvarVeiculo() {
        if (this.veiculo.id) {
            this.atualizarVeiculo();
        } else {
            this.cadastrarVeiculo();
        }
    }

    cadastrarVeiculo() {
        this.veiculoService.postVeiculo(this.veiculo).subscribe(
            result => {
                this.veiculo.fromObject(result);
                this.snackBar.open('Veiculo cadastrado com sucesso!', 'Close', {duration: 5000});
                this.router.navigate(['/veiculo']);
            },
            error => {
                this.snackBar.open('Não foi possivel cadastrar veiculo, verifique os dados e tente novamente!', 'Close', {duration: 5000});
            }
        )
    }

    private atualizarVeiculo() {
        this.veiculoService.putVeiculo(this.veiculo).subscribe(
            result => {
                this.veiculo.fromObject(result);
                this.snackBar.open('Veiculo alterado com sucesso!', 'Close', {duration: 5000});
                this.router.navigate(['/medico']);
            },
            error => {
                this.snackBar.open('Não foi possivel atualizar veiculo, verifique os dados e tente novamente!', 'Close', {duration: 5000});
            }
        )
    }
}
