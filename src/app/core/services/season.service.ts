import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { environment } from '@env/environment.development';
import { Utils } from '../helpers/utils';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  private _seasons: number[] | [] = [];

  constructor(private http: HttpClient) { }

  getSeasons(): Observable<number[] | []> {

    console.log('Ops consuming seasons from API')
    return this.http.get(`${environment.apiUrl}/leagues/seasons`).pipe(
      map((stream: unknown) => {
        const { response } = stream as AuthResponse;
        this._seasons = (response as Array<number>);
        Utils.setLocalStorageItem('seasons', this._seasons);
        return this._seasons;
      })
    );

  }

  getCachedSeasons(): Array<number> | [] {
    console.log('I am getting seasons from cache');
    this._seasons = Utils.getLocalStorageItem('seasons') ?? [];
    return this._seasons;
  }

}
