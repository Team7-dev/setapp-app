import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Reserva} from '../../../../model/reserva';
import {ReservaService} from '../../reserva.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InComponent} from '../../../../model/in-component';

@Component({
    templateUrl: 'reserva-detalhar.component.html'
})
export class ReservaDetalharComponent extends InComponent implements OnInit {

    public reserva: Reserva;

    constructor(public reservaService: ReservaService, private router: Router, private activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) {
        super();

        const id = this.activatedRoute.snapshot.params['id'];

        if (!this.reservaService.reserva) {
            this.recuperarReserva(id);
            return;
        }

        this.reserva = this.reservaService.reserva;
    }

    ngOnInit() {
    }

    recuperarReserva(id: number) {
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

}
