import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {VeiculoService} from './veiculo.service';
import {Veiculo} from '../../model/veiculo';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmarComponent} from '../../shared/dialog-confirmar.component';

@Component({
    selector: 'app-table-list',
    templateUrl: './veiculo.component.html',
    styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

    public veiculo: Veiculo = new Veiculo();
    public veiculos: Veiculo[] = [];

    displayedColumns: string[] = ['id', 'vaga', 'descricao', 'ativo', 'pesosa', 'acoes'];
    dataSource = new MatTableDataSource<Veiculo>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private veiculoService: VeiculoService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.listarVeiculos();
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    listarVeiculos() {
        this.veiculoService.getVeiculos().subscribe(
            result => {
                this.veiculos = [];
                let veiculo: Veiculo;
                for (let i = 0; i < result.length; i++) {
                    veiculo = new Veiculo();
                    veiculo.fromObject(result[i]);
                    this.veiculos.push(veiculo);
                    this.dataSource = new MatTableDataSource<Veiculo>(this.veiculos);
                    this.dataSource.paginator = this.paginator;
                }
                console.log(result);
            },
            error => {
                this.snackBar.open('Não foi possivel carregar a lista de veiculos, tente novamente!', 'Close', {duration: 5000});
                console.error(error);
            }
        )
    }

    cadastrarVeiculo() {
        this.router.navigate(['/cadastrar']);
    }

    detalharVeiculo(veiculo: Veiculo) {
        this.veiculoService.veiculo = veiculo;
        this.router.navigate(['/veiculo/detalhar/' + veiculo.id]);
    }

    editarVeiculo(veiculo: Veiculo) {
        this.veiculoService.veiculo = veiculo;
        this.router.navigate(['/veiculo/editar/' + veiculo.id]);
    }

    confirmarDelecaoVeiculo(veiculo: Veiculo) {
        const dialogRef = this.dialog.open(DialogConfirmarComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.deletarVeiculo(veiculo.id);
            }
        });
    }

    deletarVeiculo(id: number) {
        this.veiculoService.deleteVeiculo(id).subscribe(
            result => {
                this.snackBar.open('Veiculo excluido com sucesso!', 'Close', {duration: 5000});
                this.listarVeiculos();
            },
            error => {
                this.snackBar.open('Não foi possível deletar o veiculo, tente novamente!', 'Close', {duration: 5000});
            }
        )
    }

    cleanService() {
        this.veiculoService.veiculo = undefined;
    }

}
