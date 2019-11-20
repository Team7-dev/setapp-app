import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {UnidadeService} from './unidade.service';
import {Unidade} from '../../model/unidade';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmarComponent} from '../../shared/dialog-confirmar.component';

@Component({
    selector: 'app-table-list',
    templateUrl: './unidade.component.html',
    styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {

    public unidade: Unidade = new Unidade();
    public unidades: Unidade[] = [];

    displayedColumns: string[] = ['id', 'bloco', 'apartamento', 'situacao', 'acoes'];
    dataSource = new MatTableDataSource<Unidade>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private unidadeService: UnidadeService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.listarUnidades();
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    listarUnidades() {
        this.unidadeService.getUnidades().subscribe(
            result => {
                this.unidades = [];
                let unidade: Unidade;
                for (let i = 0; i < result.length; i++) {
                    unidade = new Unidade();
                    unidade.fromObject(result[i]);
                    this.unidades.push(unidade);
                    this.dataSource = new MatTableDataSource<Unidade>(this.unidades);
                    this.dataSource.paginator = this.paginator;
                }
                console.log(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
                console.error(error);
            }
        )
    }

    cadastrarUnidade() {
        this.cleanService();
        this.router.navigate(['/unidade/cadastrar']);
    }

    detalharUnidade(unidade: Unidade) {
        this.unidadeService.unidade = unidade;
        this.router.navigate(['/unidade/detalhar/' + unidade.id]);
    }

    editarUnidade(unidade: Unidade) {
        this.unidadeService.unidade = unidade;
        this.router.navigate(['unidade/editar/' + unidade.id]);
    }

    confirmarDelecaoUnidade(unidade: Unidade) {
        const dialogRef = this.dialog.open(DialogConfirmarComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.deletarUnidade(unidade.id);
            }
        });
    }

    deletarUnidade(id: number) {
        this.unidadeService.deleteUnidade(id).subscribe(
            result => {
                this.snackBar.open('Unidade excluido com sucesso!', 'X', {duration: 5000});
                this.listarUnidades();
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    cleanService() {
        this.unidadeService.unidade = new Unidade();
    }

}
