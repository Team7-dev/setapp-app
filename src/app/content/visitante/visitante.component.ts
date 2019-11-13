import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {VisitanteService} from './visitante.service';
import {Visitante} from '../../model/visitante';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmarComponent} from '../../shared/dialog-confirmar.component';

@Component({
    selector: 'app-table-list',
    templateUrl: './visitante.component.html',
    styleUrls: ['./visitante.component.css']
})
export class VisitanteComponent implements OnInit {

    public visitante: Visitante = new Visitante();
    public visitantes: Visitante[] = [];

    displayedColumns: string[] = ['nome', 'morador', 'bloco', 'apartamento', 'situacao', 'acoes'];
    dataSource = new MatTableDataSource<Visitante>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private visitanteService: VisitanteService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.listarVisitantes();
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    listarVisitantes() {
        this.visitanteService.getVisitantes().subscribe(
            result => {
                this.visitantes = [];
                let visitante: Visitante;
                for (let i = 0; i < result.length; i++) {
                    visitante = new Visitante();
                    visitante.fromObject(result[i]);
                    this.visitantes.push(visitante);
                    this.dataSource = new MatTableDataSource<Visitante>(this.visitantes);
                    this.dataSource.paginator = this.paginator;
                }
                console.log(result);
            },
            error => {
                this.snackBar.open('Não foi possivel carregar a lista de visitantes, tente novamente!', 'X', {duration: 5000});
                console.error(error);
            }
        )
    }

    cadastrarVisitante() {
        this.cleanService();
        this.router.navigate(['/visitante/cadastrar']);
    }

    detalharVisitante(visitante: Visitante) {
        this.visitanteService.visitante = visitante;
        this.router.navigate(['/visitante/detalhar/' + visitante.id]);
    }

    editarVisitante(visitante: Visitante) {
        this.visitanteService.visitante = visitante;
        this.router.navigate(['visitante/editar/' + visitante.id]);
    }

    confirmarDelecaoVisitante(visitante: Visitante) {
        const dialogRef = this.dialog.open(DialogConfirmarComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.deletarVisitante(visitante.id);
            }
        });
    }

    deletarVisitante(id: number) {
        this.visitanteService.deleteVisitante(id).subscribe(
            result => {
                this.snackBar.open('Visitante excluido com sucesso!', 'X', {duration: 5000});
                this.listarVisitantes();
            },
            error => {
                this.snackBar.open('Não foi possível deletar o visitante, tente novamente!', 'X', {duration: 5000});
            }
        )
    }

    alterarSituacaoVisitante(visitante: Visitante) {

        if('ATIVO' === visitante.situacao) {
            visitante.situacao = 'INATIVO';
        } else {
            visitante.situacao = 'ATIVO';
        }

        this.visitanteService.putVisitante(visitante).subscribe(
            result => {
                this.snackBar.open('Situação do visitante alterada com sucesso!', 'X', {duration: 5000});
                this.listarVisitantes();
            },
            error => {
                this.snackBar.open('Não foi possível alterar a situação do visitante, tente novamente!', 'X', {duration: 5000});
            }
        )
    }

    cleanService() {
        this.visitanteService.visitante = new Visitante();
    }

}
