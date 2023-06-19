import { Player, PlayerResponse, Team } from './../../shared/types/types';
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
  private _players: Array<any> = [];

  constructor(private http: HttpClient) {}

  getTeams(params: HttpOptions): Observable<TeamResponse[]> {
    const httpParams = Utils.setHttpParams(params);

    return this.http.get(`${environment.apiUrl}/teams`, httpParams).pipe(
      map((stream: unknown) => {
        const { response } = stream as AuthResponse;
        this._teams = (response as Array<TeamResponse>);
        return this._teams;
      })
    );
  }

  getPlayers(params: HttpOptions): Observable<PlayerResponse[]> {

    params = { season: params.season, league: params.league, team: params.team };
    const httpParams = Utils.setHttpParams(params);

    return this.http.get(`${environment.apiUrl}/players`, httpParams).pipe(
      map((stream: unknown) => {
        const { response } = stream as AuthResponse;
        this._players = (response as Array<PlayerResponse>);
        return this._players;
      })
    );
  }

}

export type HttpOptions =  {
  country?: string,
  season?: string,
  league?: string,
  team?: string
};
