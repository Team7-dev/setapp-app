import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {Assembleia} from '../../model/assembleia';
import {AppService} from '../../app.service';


@Injectable({
    providedIn: 'root'
})
export class AssembleiaService extends AppService {

    public assembleia: Assembleia;

    constructor(private http: HttpClient) {
        super();
    }

    public getAssembleias(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/assembleia', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getAssembleia(id): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/assembleia/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public putAssembleia(assembleia: Assembleia): Observable<any> {
        return this.http.put<any>(this.baseApi + 'setapp-api/assembleia', assembleia, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public deleteAssembleia(id): Observable<any> {
        return this.http.delete<any>(this.baseApi + 'setapp-api/assembleia/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    postAssembleia(assembleia: Assembleia) {
        return this.http.post<any>(this.baseApi + 'setapp-api/assembleia', assembleia, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }
}
