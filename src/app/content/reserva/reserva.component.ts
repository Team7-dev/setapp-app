import {Component, OnInit, ViewChild} from '@angular/core';
import {Reserva} from '../../model/reserva';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmarComponent} from '../../shared/dialog-confirmar.component';
import {ReservaService} from './reserva.service';

@Component({
    selector: 'app-table-list',
    templateUrl: './reserva.component.html',
    styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

    public reserva: Reserva = new Reserva();
    public reservas: Reserva[] = [];

    displayedColumns: string[] = ['id', 'dataHoraRecebida', 'dataHoraRetirada', 'usuario', 'situacao', 'acoes'];
    dataSource = new MatTableDataSource<Reserva>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private reservaService: ReservaService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.listarReservas();
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    listarReservas() {
        this.reservaService.getReservas().subscribe(
            result => {
                this.reservas = [];
                let reserva: Reserva;
                for (let i = 0; i < result.length; i++) {
                    reserva = new Reserva();
                    reserva.fromObject(result[i]);
                    this.reservas.push(reserva);
                    this.dataSource = new MatTableDataSource<Reserva>(this.reservas);
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

    cadastrarReserva() {
        this.cleanService();
        this.router.navigate(['/reserva/cadastrar']);
    }

    detalharReserva(reserva: Reserva) {
        this.reservaService.reserva = reserva;
        this.router.navigate(['/reserva/detalhar/' + reserva.id]);
    }

    editarReserva(reserva: Reserva) {
        this.reservaService.reserva = reserva;
        this.router.navigate(['reserva/editar/' + reserva.id]);
    }

    confirmarDelecaoReserva(reserva: Reserva) {
        const dialogRef = this.dialog.open(DialogConfirmarComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.deletarReserva(reserva.id);
            }
        });
    }

    deletarReserva(id: number) {
        this.reservaService.deleteReserva(id).subscribe(
            result => {
                this.snackBar.open('Reserva excluido com sucesso!', 'X', {duration: 5000});
                this.listarReservas();
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    alterarSituacaoReserva(reserva: Reserva) {

        if ('PENDENTE' === reserva.situacao) {
            reserva.dataHoraInicio = new Date();
            reserva.situacao = 'RETIRADA';
        } else {
            reserva.dataHoraInicio = null;
            reserva.situacao = 'PENDENTE';
        }

        this.reservaService.putReserva(reserva).subscribe(
            result => {
                this.snackBar.open('Situação da reserva alterada com sucesso!', 'X', {duration: 5000});
                this.listarReservas();
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    cleanService() {
        this.reservaService.reserva = new Reserva();
    }

}
