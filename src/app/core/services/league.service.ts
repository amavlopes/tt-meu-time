import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment.development';
import { GenericObjectString, LeagueResponse, Params } from '@shared/types/types';
import { map } from 'rxjs/operators';
import { AuthResponse } from '@shared/types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {

  private _leagues: LeagueResponse[] = [];

  constructor(private http: HttpClient) {}

  getLeagues(params: GenericObjectString) : Observable<LeagueResponse[]>{
    const httpParams = this.setHttpParams(params);

    return this.http.get(`${environment.apiUrl}/leagues`, httpParams).pipe(
      map((stream: unknown) => {
        const { response } = stream as AuthResponse;
        this._leagues = (response as Array<LeagueResponse>);
        return this._leagues;
      })
    );
  }

  setHttpParams(params: GenericObjectString): Params {
    let urlParams = { params: new HttpParams({})};
    for (const key of Object.keys(params)) {
      urlParams.params = urlParams.params.set(key, params[key])
    }
    return urlParams;
  }

}
