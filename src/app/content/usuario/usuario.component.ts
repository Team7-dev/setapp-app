import {Component, OnInit, ViewChild} from '@angular/core';
import {Usuario} from '../../model/usuario';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmarComponent} from '../../shared/dialog-confirmar.component';
import {UsuarioService} from './usuario.service';

@Component({
    selector: 'app-table-list',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

    public usuario: Usuario = new Usuario();
    public usuarios: Usuario[] = [];

    displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'situacao', 'acoes'];
    dataSource = new MatTableDataSource<Usuario>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private usuarioService: UsuarioService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.listarUsuarios();
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    listarUsuarios() {
        this.usuarioService.getUsuarios().subscribe(
            result => {
                this.usuarios = [];
                let usuario: Usuario;
                for (let i = 0; i < result.length; i++) {
                    usuario = new Usuario();
                    usuario.fromObject(result[i]);
                    this.usuarios.push(usuario);
                    this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
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

    cadastrarUsuario() {
        this.cleanService();
        this.router.navigate(['/usuario/cadastrar']);
    }

    detalharUsuario(usuario: Usuario) {
        this.usuarioService.usuario = usuario;
        this.router.navigate(['/usuario/detalhar/' + usuario.id]);
    }

    editarUsuario(usuario: Usuario) {
        this.usuarioService.usuario = usuario;
        this.router.navigate(['usuario/editar/' + usuario.id]);
    }

    confirmarDelecaoUsuario(usuario: Usuario) {
        const dialogRef = this.dialog.open(DialogConfirmarComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.deletarUsuario(usuario.id);
            }
        });
    }

    deletarUsuario(id: number) {
        this.usuarioService.deleteUsuario(id).subscribe(
            result => {
                this.snackBar.open('Usuario excluido com sucesso!', 'X', {duration: 5000});
                this.listarUsuarios();
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    alterarSituacaoUsuario(usuario: Usuario) {

        if ('ATIVO' === usuario.situacao) {
            usuario.situacao = 'INATIVO';
        } else {
            usuario.situacao = 'ATIVO';
        }

        this.usuarioService.putUsuario(usuario).subscribe(
            result => {
                this.snackBar.open('Situação do usuario alterada com sucesso!', 'X', {duration: 5000});
                this.listarUsuarios();
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    cleanService() {
        this.usuarioService.usuario = new Usuario();
    }

}
