import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {Unidade} from '../../model/unidade';
import {AppService} from '../../app.service';


@Injectable({
    providedIn: 'root'
})
export class UnidadeService extends AppService {

    public unidade: Unidade;

    constructor(private http: HttpClient) {
        super();
    }

    public getUnidades(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/unidade', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getUnidade(id): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/unidade/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public putUnidade(unidade: Unidade): Observable<any> {
        return this.http.put<any>(this.baseApi + 'setapp-api/unidade', unidade, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public deleteUnidade(id): Observable<any> {
        return this.http.delete<any>(this.baseApi + 'setapp-api/unidade/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    postUnidade(unidade: Unidade) {
        return this.http.post<any>(this.baseApi + 'setapp-api/unidade', unidade, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getUnidadesOccupied(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/unidade/ocupadas', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getUnidadesUnoccupied(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/unidade/vagas', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }
}
