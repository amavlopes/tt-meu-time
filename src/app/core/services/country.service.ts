import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@env/environment.development';
import { Country } from '@shared/types/types';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Array<Country> | []> {
    return this.http.get(`${environment.apiUrl}/countries`).pipe(
      map((stream: unknown) => {
        const { response } = stream as AuthResponse;
        return (response as Array<Country>);
      })
    );
  }

}
