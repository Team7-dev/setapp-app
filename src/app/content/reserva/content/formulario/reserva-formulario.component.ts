import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Reserva} from '../../../../model/reserva';
import {ActivatedRoute, Router} from '@angular/router';
import {ReservaService} from '../../reserva.service';
import {InComponent} from '../../../../model/in-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Usuario} from '../../../../model/usuario';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {map, startWith, take} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {UsuarioService} from '../../../usuario/usuario.service';
import {now} from 'moment';
import {AreaReserva} from '../../../../model/area-reserva';

@Component({
    templateUrl: './reserva-formulario.component.html',
})
export class ReservaFormularioComponent extends InComponent implements OnInit {

    @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

    title: string;
    public reserva: Reserva = new Reserva();
    dateControl = new FormControl(now());
    myControl = new FormControl();
    options: Usuario[] = [];
    filteredOptions: Observable<Usuario[]>;
    areaReserva: AreaReserva[] = [];

    constructor(public reservaService: ReservaService, private router: Router, public activatedRoute: ActivatedRoute, public snackBar: MatSnackBar, private _ngZone: NgZone, public usuarioService: UsuarioService) {
        super();

        this.activatedRoute.data.subscribe(
            result => {
                this.title = result.title;
            }
        );

        if (this.reservaService.reserva) {
            this.reserva = this.reservaService.reserva;
            return;
        }

        const id = this.activatedRoute.snapshot.params['id'];

        if (id) {
            this.carregarReserva(id);
        }
    }

    ngOnInit() {
        if (!this.activatedRoute.snapshot.params['id']) {
            this.reserva.usuario = new Usuario();
        }

        this.recuperarUsuario();
        this.recuperarAreaReserva();

        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    displayFn(usuario) {
        return usuario.nome;
    }

    carregarReserva(id: number) {
        this.reservaService.getReserva(id).subscribe(
            result => {
                this.reserva.fromObject(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
                this.router.navigate(['/reserva']);
            }
        )
    }

    salvarReserva() {
        if (this.reserva.id) {
            this.reserva.dataHoraCadastro = new Date();
            this.atualizarReserva();
        } else {
            this.reserva.dataHoraCadastro = new Date();
            this.reserva.situacao = 'PENDENTE';
            this.cadastrarReserva();
        }
    }

    cadastrarReserva() {
        this.reservaService.postReserva(this.reserva).subscribe(
            result => {
                this.snackBar.open('Reserva cadastrado com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/reserva']);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    recuperarUsuario() {
        this.usuarioService.getUsuariosActives().subscribe(
            result => {
                this.options = [];
                let usuario: Usuario;
                for (let i = 0; i < result.length; i++) {
                    usuario = new Usuario();
                    usuario.fromObject(result[i]);
                    this.options.push(usuario);
                }
                console.log(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    private _filter(value: string): Usuario[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.nome.toLowerCase().includes(filterValue));
    }

    private atualizarReserva() {
        this.reservaService.putReserva(this.reserva).subscribe(
            result => {
                this.snackBar.open('Reserva alterado com sucesso!', 'X', {duration: 5000});
                this.router.navigate(['/reserva']);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

    recuperarAreaReserva() {
        this.reservaService.getAreaReserva().subscribe(
            result => {
                this.areaReserva = [];
                let areaReserva: AreaReserva;
                for (let i = 0; i < result.length; i++) {
                    areaReserva = new AreaReserva();
                    areaReserva.fromObject(result[i]);
                    this.areaReserva.push(areaReserva);
                }
                console.log(result);
            },
            error => {
                this.snackBar.open('' + error + '', 'X', {duration: 5000});
            }
        )
    }

}
