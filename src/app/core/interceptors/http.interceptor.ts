 import {HttpInterceptorFn} from "@angular/common/http";
 import {tap} from "rxjs";
 import { catchError } from "rxjs";     
 import { throwError } from "rxjs";

 export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
     console.log('Interceptando Requisição: ', req.url);

     //aui vc pode adicionar lógica para modificar a requisição
     const token = 'fake-token-jwt';
     const novaReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            },
     });

     return next(novaReq).pipe(
        tap({
            next: (event) => console.log('Responde: ', event),
            error: (error) => console.error('Erro de Requisição: ', error)
        }),
        catchError((error) => {
            console.error('Erro de Requisição Global: ', error);
        if (error.status === 401) {
            console.warn('Erro de autenticação do Usuario: ');
        }
          if (error.status === 500) {
            console.warn('Erro interno do servidor!', error);
        }
            return throwError(() => error);
        }),
     );

 };