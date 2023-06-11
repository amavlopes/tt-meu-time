import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@env/environment.development';
import { Country } from '@shared/types/types';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Utils } from '../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _countries: Array<Country> | [] = [];

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Array<Country> | []> {
    console.log('Ops consuming countries from API')
    return this.http.get(`${environment.apiUrl}/countries`).pipe(
      map((stream: unknown) => {
        const { response } = stream as AuthResponse;
        this._countries = (response as Array<Country>);
        Utils.setLocalStorageItem('countries', this._countries);
        return this._countries;
      })
    );
  }

  getCachedCountries(): Array<Country> | [] {
    console.log('I am getting countries from cache');
    this._countries = Utils.getLocalStorageItem('countries') ?? [];
    return this._countries;
  }

  getCountryByName(name: string): Country | undefined {
    return this._countries.find((country) => country.name === name);
  }

}
