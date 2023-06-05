import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  retry,
  throwError,
} from 'rxjs';

import { environment } from '@env/environment.development';
import { AuthResponse } from '@core/interfaces/auth-response.interface';
import { User } from '@core/models/user.model';
import { Utils } from '@app/core/helpers/utils';

const options = {
  observe: 'body' as const,
  headers: new HttpHeaders({
    'x-rapidapi-host': environment.apiUrl,
    'x-rapidapi-key': '',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject(Utils.getLocalStorageItem('user'));
    this.user$ = this.user.asObservable();
  }

  public get userValue(): User | null {
    return this.user.value;
  }

  login(token: string): Observable<User | never> {
    options.headers = options.headers.set('x-rapidapi-key', token);

    return this.http.get(`${environment.apiUrl}/status`, options).pipe(
      map((stream: unknown ) => {
        const { errors, response } = stream as AuthResponse;
        const user = {...response.account, token};
        this.setInvalidTokenErrorGuard(errors);
        return this.authenticateUser(user);
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  setInvalidTokenErrorGuard<T extends {token: string}>(errors: T) {
    if (!!errors.token) throw new HttpErrorResponse({ status: 401 });
  }

  private authenticateUser(user: User) {
    user = new User(user);
    Utils.setLocalStorageItem('user', user);
    this.user.next(user);
    return user;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    switch (error.status) {
      case 0:
        errorMessage = 'Falha na conexão. Tente novamente mais tarde';
        break;
      case 401:
        errorMessage = 'Não autorizado: API key inválida';
        break;
      default:
        errorMessage = 'Algo deu errado. Tente novamente mais tarde';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
  }
}
