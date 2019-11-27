import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AssembleiaService} from './assembleia.service';
import {Assembleia} from '../../model/assembleia';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmarComponent} from '../../shared/dialog-confirmar.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './assembleia.component.html',
  styleUrls: ['./assembleia.component.css']
})
export class AssembleiaComponent implements OnInit {

  public assembleia: Assembleia = new Assembleia();
  public assembleias: Assembleia[] = [];

  displayedColumns: string[] = ['id', 'motivo', 'situacao', 'dataHoraCadastro', 'dataHoraAgendamento', 'dataHoraConclusao', 'acoes'];
  dataSource = new MatTableDataSource<Assembleia>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private assembleiaService: AssembleiaService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.listarAssembleias();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listarAssembleias() {
    this.assembleiaService.getAssembleias().subscribe(
        result => {
          this.assembleias = [];
          let assembleia: Assembleia;
          for (let i = 0; i < result.length; i++) {
            assembleia = new Assembleia();
            assembleia.fromObject(result[i]);
            this.assembleias.push(assembleia);
            this.dataSource = new MatTableDataSource<Assembleia>(this.assembleias);
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

  cadastrarAssembleia() {
    this.cleanService();
    this.router.navigate(['/assembleia/cadastrar']);
  }

  detalharAssembleia(assembleia: Assembleia) {
    this.assembleiaService.assembleia = assembleia;
    this.router.navigate(['/assembleia/detalhar/' + assembleia.id]);
  }

  editarAssembleia(assembleia: Assembleia) {
    this.assembleiaService.assembleia = assembleia;
    this.router.navigate(['assembleia/editar/' + assembleia.id]);
  }

  confirmarDelecaoAssembleia(assembleia: Assembleia) {
    const dialogRef = this.dialog.open(DialogConfirmarComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.deletarAssembleia(assembleia.id);
      }
    });
  }

  deletarAssembleia(id: number) {
    this.assembleiaService.deleteAssembleia(id).subscribe(
        result => {
          this.snackBar.open('Assembleia excluido com sucesso!', 'X', {duration: 5000});
          this.listarAssembleias();
        },
        error => {
          this.snackBar.open('' + error + '', 'X', {duration: 5000});
        }
    )
  }

  alterarSituacaoAssembleia(assembleia: Assembleia) {

    if('ATIVO' === assembleia.situacao) {
      assembleia.situacao = 'INATIVO';
    } else {
      assembleia.situacao = 'ATIVO';
    }

    this.assembleiaService.putAssembleia(assembleia).subscribe(
        result => {
          this.snackBar.open('Situação do assembleia alterada com sucesso!', 'X', {duration: 5000});
          this.listarAssembleias();
        },
        error => {
          this.snackBar.open('' + error + '', 'X', {duration: 5000});
        }
    )
  }

  cleanService() {
    this.assembleiaService.assembleia = new Assembleia();
  }

}
