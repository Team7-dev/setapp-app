import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {Reserva} from '../../model/reserva';
import {AppService} from '../../app.service';


@Injectable({
    providedIn: 'root'
})
export class ReservaService extends AppService {

    public reserva: Reserva;

    constructor(private http: HttpClient) {
        super();
    }

    public getReservas(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/reserva', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getReserva(id): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/reserva/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public putReserva(reserva: Reserva): Observable<any> {
        return this.http.put<any>(this.baseApi + 'setapp-api/reserva', reserva, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public deleteReserva(id): Observable<any> {
        return this.http.delete<any>(this.baseApi + 'setapp-api/reserva/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public postReserva(reserva: Reserva) {
        return this.http.post<any>(this.baseApi + 'setapp-api/reserva', reserva, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getReservasActives(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/reserva/ativos', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

}
