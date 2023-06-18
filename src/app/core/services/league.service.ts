import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment.development';
import { GenericObjectString, LeagueResponse, Params } from '@shared/types/types';
import { map } from 'rxjs/operators';
import { AuthResponse } from '@shared/types/types';
import { Observable } from 'rxjs';
import { Utils } from '../helpers/utils';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {

  private _leagues: Array<LeagueResponse> = [];

  constructor(private http: HttpClient) {}

  getLeagues(params: GenericObjectString): Observable<LeagueResponse[]> {
    const httpParams = Utils.setHttpParams(params);

    return this.http.get(`${environment.apiUrl}/leagues`, httpParams).pipe(
      map((stream: unknown) => {
        const { response } = stream as AuthResponse;
        this._leagues = (response as Array<LeagueResponse>);
        return this._leagues;
      })
    );
  }

}
