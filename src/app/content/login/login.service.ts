import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {AppService} from '../../app.service';
import {Usuario} from '../../model/usuario';


@Injectable({
    providedIn: 'root'
})
export class LoginService extends AppService {

    public usuario: any;

    public nextUrl: string;

    constructor(private httpClient: HttpClient) {
        super();
    }

    doLogin(usuario: Usuario): Observable<string> {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.httpClient.post(this.baseApi + 'setapp-api/login', usuario, {headers, responseType: 'text'}).pipe(
            catchError(this.handleError)
        );
    }
}
