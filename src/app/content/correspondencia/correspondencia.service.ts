import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {Correspondencia} from '../../model/correspondencia';
import {AppService} from '../../app.service';


@Injectable({
    providedIn: 'root'
})
export class CorrespondenciaService extends AppService {

    public correspondencia: Correspondencia;

    constructor(private http: HttpClient) {
        super();
    }

    public getCorrespondencias(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/correspondencia', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getCorrespondencia(id): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/correspondencia/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public putCorrespondencia(correspondencia: Correspondencia): Observable<any> {
        return this.http.put<any>(this.baseApi + 'setapp-api/correspondencia', correspondencia, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public deleteCorrespondencia(id): Observable<any> {
        return this.http.delete<any>(this.baseApi + 'setapp-api/correspondencia/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public postCorrespondencia(correspondencia: Correspondencia) {
        return this.http.post<any>(this.baseApi + 'setapp-api/correspondencia', correspondencia, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getCorrespondenciasActives(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/correspondencia/ativos', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

}
