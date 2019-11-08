import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {Visitante} from '../../model/visitante';
import {AppService} from '../../app.service';


@Injectable({
    providedIn: 'root'
})
export class VisitanteService extends AppService {

    public visitante: Visitante;

    constructor(private http: HttpClient) {
        super();
    }

    public getVisitantes(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/visitante', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getVisitante(id): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/visitante/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public putVisitante(visitante: Visitante): Observable<any> {
        return this.http.put<any>(this.baseApi + 'setapp-api/visitante', visitante, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public deleteVisitante(id): Observable<any> {
        return this.http.delete<any>(this.baseApi + 'setapp-api/visitante/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    postVisitante(visitante: Visitante) {
        return this.http.post<any>(this.baseApi + 'setapp-api/visitante', visitante, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }
}
