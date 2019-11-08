import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AppService} from '../../app.service';
import {Veiculo} from '../../model/veiculo';


@Injectable({
    providedIn: 'root'
})
export class VeiculoService extends AppService {

    public veiculo: Veiculo;

    constructor(private http: HttpClient) {
        super();
    }

    public getVeiculos(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/veiculo', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getVeiculo(id): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/veiculo/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public putVeiculo(veiculo: Veiculo): Observable<any> {
        return this.http.put<any>(this.baseApi + 'setapp-api', veiculo, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public deleteVeiculo(id): Observable<any> {
        return this.http.delete<any>(this.baseApi + 'setapp-api/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    postVeiculo(veiculo: Veiculo) {
        return this.http.post<any>(this.baseApi + 'setapp-api', veiculo, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }
}
