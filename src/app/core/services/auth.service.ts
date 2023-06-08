import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  map,
} from 'rxjs';

import { environment } from '@env/environment.development';
import { AuthResponse } from '@core/interfaces/auth-response.interface';
import { User } from '@core/models/user.model';
import { Utils } from '@core/helpers/utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new BehaviorSubject(Utils.getLocalStorageItem('user'));
    this.user$ = this.user.asObservable();
  }

  public get userValue(): User | null {
    return this.user.value;
  }

  isLoggedIn(): boolean {
    return this.userValue !== null ? true : false;
  }

  login(token: string): Observable<User | never> {
    token = token.trim();
    return this.http
      .get(`${environment.apiUrl}/status`, {
        headers: new HttpHeaders({
          'x-rapidapi-key': token,
        }),
      })
      .pipe(
        map((stream: unknown) => {
          const { response } = stream as AuthResponse;
          const user = { ...response.account, token };
          return this.authenticateUser(user);
        })
      );
  }

  private authenticateUser(user: User) {
    user = new User(user);
    Utils.setLocalStorageItem('user', user);
    this.user.next(user);
    return user;
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['/login']);
  }
}
