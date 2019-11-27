import {Component, OnInit} from '@angular/core';
import {Veiculo} from '../../../../model/veiculo';
import {ActivatedRoute, Router} from '@angular/router';
import {VeiculoService} from '../../veiculo.service';
import {InComponent} from '../../../../model/in-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Unidade} from '../../../../model/unidade';
import {UnidadeService} from '../../../unidade/unidade.service';
import {Usuario} from '../../../../model/usuario';

@Component({
    templateUrl: './veiculo-formulario.component.html',
})
export class VeiculoFormularioComponent extends InComponent implements OnInit {

    title: string;
    public veiculo: Veiculo = new Veiculo();
    myControl = new FormControl();
    options: Unidade[] = [];
    filteredOptions: Observable<Unidade[]>;

    constructor(public veiculoService: VeiculoService, private router: Router, public activatedRoute: ActivatedRoute, public snackBar: MatSnackBar, public unidadeService: UnidadeService) {
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
        } else {
            this.veiculo.unidade = null;
        }
    }

    ngOnInit() {
        if (!this.activatedRoute.snapshot.params['id']) {
            this.veiculo.usuario = new Usuario();
            this.veiculo.unidade = new Unidade();
        }

        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    private _filter(value: string): Unidade[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.bloco.toLowerCase().includes(filterValue));
    }

    displayFn(unidade) {
        if(unidade.bloco && unidade.numero) {
            return unidade.bloco + ' - ' + unidade.numero;
        } else {
            return '';
        }
    }

    carregarVeiculo(id: number) {
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

    salvarVeiculo() {
        if (this.veiculo.id) {
            this.veiculo.usuario = this.veiculo.unidade.usuario;
            this.veiculo.dataHoraCadastro = new Date();
            this.atualizarVeiculo();
        } else {
            if(this.veiculo.situacao)
            this.veiculo.usuario = this.veiculo.unidade.usuario;
            this.veiculo.dataHoraCadastro = new Date();
            this.cadastrarVeiculo();
        }
    }

    cadastrarVeiculo() {
        this.veiculoService.postVeiculo(this.veiculo).subscribe(
            result => {
                this.snackBar.open('Veiculo cadastrada com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/veiculo']);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    recuperarUnidades() {
        this.veiculo.unidade = new Unidade();
        this.veiculo.usuario = new Usuario();
        if (this.veiculo.situacao === 'VAGA') {
            this.recuperarUnidadesVagas();
        } else {
            this.recuperarUnidadesOcupadas();
        }
    }

    recuperarUnidadesVagas() {
        this.unidadeService.getUnidadesUnoccupied().subscribe(
            result => {
                this.options = [];
                let unidade: Unidade;
                for (let i = 0; i < result.length; i++) {
                    unidade = new Unidade();
                    unidade.fromObject(result[i]);
                    this.options.push(unidade);
                }
                console.log(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    recuperarUnidadesOcupadas() {
        this.unidadeService.getUnidadesOccupied().subscribe(
            result => {
                this.options = [];
                let unidade: Unidade;
                for (let i = 0; i < result.length; i++) {
                    unidade = new Unidade();
                    unidade.fromObject(result[i]);
                    this.options.push(unidade);
                }
                console.log(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    private atualizarVeiculo() {
        this.veiculoService.putVeiculo(this.veiculo).subscribe(
            result => {
                this.snackBar.open('Veiculo alterada com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/veiculo']);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

}
