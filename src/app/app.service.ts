import {Injectable, isDevMode} from '@angular/core';

import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable()
export class AppService {

    get baseApi() {
        if (isDevMode()) {
            return 'http://localhost:8080/';
        }

        return 'https://api.setapp-app.com/'; // production url
    }

    get constApi() {
        return '/assets/const/';
    }


    /*protected extractData(res: HttpResponse<any>): ApiResponse {
        const apiResponse: ApiResponse = new ApiResponse();
        if (res['data']) {
            apiResponse.fromObject(res['data']);
            if (!apiResponse.result && apiResponse.array) {
                apiResponse.result = [];
            }
        } else {
            apiResponse.result = res;
        }
        if (apiResponse.className) {
            let newResult = apiResponse.result;
            if (apiResponse.result && apiResponse.array) {
                newResult = [];
                for (let i = 0; i < apiResponse.result.length; i++) {
                    const instance = new AppModel[apiResponse.className]();
                    instance.fromObject(apiResponse.result[i]);
                    newResult.push(instance);
                }
            } else {
                const instance = new AppModel[apiResponse.className]();
                instance.fromObject(apiResponse.result);
                newResult = instance;
            }
            apiResponse.result = newResult;
        }
        return apiResponse;
    }*/

    protected getHeaders(auth: boolean = true): any {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
        });

        if (auth && localStorage.getItem('access_token')) {
            headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        }

        return {'headers': headers};
    }

    /* Use isso se a resposta da API não tiver nenhuma estrutura */
    protected extractData(res: HttpResponse<any>): any {
        return res;
    }

    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('Ocorreu um erro:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend retornou o codigo ${error.status}, ` +
                `Erro: ${error.error}`);

            console.log(error);
        }
        // return an observable with a user-facing error message
        if(error.status == 500) {
            return throwError('Erro interno, favor entrar em contato com o suporte!');
        } else if(error.status == 404 && error.error == '[object Object]') {
            return throwError('Não há registros disponíveis!');
        } else {
            return throwError(error.status + " - " + error.error);
        }
    }

}
