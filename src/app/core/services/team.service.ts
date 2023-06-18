import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AuthResponse, GenericObjectString, LeagueResponse, TeamResponse } from '@app/shared/types/types';
import { Utils } from '../helpers/utils';
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private _teams: Array<any> = [];

  constructor(private http: HttpClient) {}

  getTeams(params: GenericObjectString): Observable<TeamResponse[]> {
    const httpParams = Utils.setHttpParams(params);

    return this.http.get(`${environment.apiUrl}/teams`, httpParams).pipe(
      map((stream: unknown) => {
        const { response } = stream as AuthResponse;
        this._teams = (response as Array<LeagueResponse>);
        return this._teams;
      })
    );
  }

}
