import {Component, OnInit, ViewChild} from '@angular/core';
import {Correspondencia} from '../../model/correspondencia';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmarComponent} from '../../shared/dialog-confirmar.component';
import {CorrespondenciaService} from './correspondencia.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './correspondencia.component.html',
  styleUrls: ['./correspondencia.component.css']
})
export class CorrespondenciaComponent implements OnInit {

  public correspondencia: Correspondencia = new Correspondencia();
  public correspondencias: Correspondencia[] = [];

  displayedColumns: string[] = ['id', 'dataHoraRecebida', 'dataHoraRetirada', 'usuario', 'situacao', 'acoes'];
  dataSource = new MatTableDataSource<Correspondencia>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private correspondenciaService: CorrespondenciaService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.listarCorrespondencias();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listarCorrespondencias() {
    this.correspondenciaService.getCorrespondencias().subscribe(
        result => {
          this.correspondencias = [];
          let correspondencia: Correspondencia;
          for (let i = 0; i < result.length; i++) {
            correspondencia = new Correspondencia();
            correspondencia.fromObject(result[i]);
            this.correspondencias.push(correspondencia);
            this.dataSource = new MatTableDataSource<Correspondencia>(this.correspondencias);
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

  cadastrarCorrespondencia() {
    this.cleanService();
    this.router.navigate(['/correspondencia/cadastrar']);
  }

  detalharCorrespondencia(correspondencia: Correspondencia) {
    this.correspondenciaService.correspondencia = correspondencia;
    this.router.navigate(['/correspondencia/detalhar/' + correspondencia.id]);
  }

  editarCorrespondencia(correspondencia: Correspondencia) {
    this.correspondenciaService.correspondencia = correspondencia;
    this.router.navigate(['correspondencia/editar/' + correspondencia.id]);
  }

  confirmarDelecaoCorrespondencia(correspondencia: Correspondencia) {
    const dialogRef = this.dialog.open(DialogConfirmarComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.deletarCorrespondencia(correspondencia.id);
      }
    });
  }

  deletarCorrespondencia(id: number) {
    this.correspondenciaService.deleteCorrespondencia(id).subscribe(
        result => {
          this.snackBar.open('Correspondencia excluido com sucesso!', 'X', {duration: 5000});
          this.listarCorrespondencias();
        },
        error => {
          this.snackBar.open('' + error + '', 'X', {duration: 5000});
        }
    )
  }

  alterarSituacaoCorrespondencia(correspondencia: Correspondencia) {

    if ('ATIVO' === correspondencia.situacao) {
      correspondencia.situacao = 'INATIVO';
    } else {
      correspondencia.situacao = 'ATIVO';
    }

    this.correspondenciaService.putCorrespondencia(correspondencia).subscribe(
        result => {
          this.snackBar.open('Situação do correspondencia alterada com sucesso!', 'X', {duration: 5000});
          this.listarCorrespondencias();
        },
        error => {
          this.snackBar.open('' + error + '', 'X', {duration: 5000});
        }
    )
  }

  cleanService() {
    this.correspondenciaService.correspondencia = new Correspondencia();
  }

}
