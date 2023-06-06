import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { AuthResponse } from '@core/interfaces/auth-response.interface';
import { HttpError } from './http-error.error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: (httpEvent) => {
          this.catchHttpResponseErrorMissingKey(httpEvent);
        },
        error: (err) => {
          if ([401, 403].includes(err.status) && this.auth.userValue) {
            this.auth.logout();
          }
          console.log('[ERROR INTERCEPTOR]: ', err);
          return throwError(() => new HttpError(err.status, err.message));
        },
      }),
      catchError(this.handleError)
    );
  }

  private catchHttpResponseErrorMissingKey<T>(httpEvent: HttpEvent<T>) {
    if (httpEvent instanceof HttpResponse<T>) {
      const { errors } = <AuthResponse>httpEvent.body;
      if (errors && errors.token) {
        throw new HttpError(1, errors.token);
      }
    }
  }

  private handleError(error: HttpError) {
    let errorMessage = '';
    switch (error.status) {
      case 0:
        errorMessage = 'Falha na conexão. Tente novamente mais tarde.';
        break;
      case 1:
        errorMessage = 'API key inválida';
        break;
      default:
        errorMessage = 'Algo deu errado. Tente novamente mais tarde.';
        break;
    }
    return throwError(() => new HttpError(error.status, errorMessage));
  }

}
