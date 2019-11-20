import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {Usuario} from '../../model/usuario';
import {AppService} from '../../app.service';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService extends AppService {

    public usuario: Usuario;

    constructor(private http: HttpClient) {
        super();
    }

    public getUsuarios(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/usuario', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getUsuario(id): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/usuario/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public putUsuario(usuario: Usuario): Observable<any> {
        return this.http.put<any>(this.baseApi + 'setapp-api/usuario', usuario, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public deleteUsuario(id): Observable<any> {
        return this.http.delete<any>(this.baseApi + 'setapp-api/usuario/' + id, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public postUsuario(usuario: Usuario) {
        return this.http.post<any>(this.baseApi + 'setapp-api/usuario', usuario, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

    public getUsuariosActives(): Observable<any> {
        return this.http.get<any>(this.baseApi + 'setapp-api/usuario/ativos', this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        )
    }

}
