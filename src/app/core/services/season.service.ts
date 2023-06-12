import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@env/environment.development';
import { Utils } from '@core/helpers/utils';
import { AuthResponse } from '@shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  private _seasons: number[] = [];

  constructor(private http: HttpClient) { }

  getSeasons(): Observable<number[]> {
    return this.http.get(`${environment.apiUrl}/leagues/seasons`).pipe(
      map((stream: unknown) => {
        const { response } = stream as AuthResponse;
        this._seasons = (response as Array<number>);
        Utils.setLocalStorageItem('seasons', this._seasons);
        return this._seasons;
      })
    );
  }

  getCachedSeasons(): Array<number> {
    this._seasons = Utils.getLocalStorageItem('seasons') ?? [];
    return this._seasons;
  }

}
