import { HttpParams } from '@angular/common/http';

export type ValidationType = 'alert' | 'success' | 'warning';

export type Validation = {
  message: string;
  type: ValidationType;
  condition: boolean;
};

export type AuthResponse = {
  get: string;
  parameters: [];
  errors: {
    token: string;
    bug?: string;
  };
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: ResponseStatus | Array<Country> | Array<number> | Array<LeagueResponse>;
};

export type ResponseStatus = {
  account: {
    firstname: string;
    lastname: string;
    email: string;
  };
  subscription: {
    plan: string;
    end: string;
    active: boolean;
  };
  requests: {
    current: number;
    limit_day: number;
  };
};

export type Country = { name: string; code: string; flag?: string };

export type Params = { params: HttpParams };

export type GenericObjectString = { [key: string]: string };

export type LeagueResponse = {
  league: League;
  country: Country;
  seasons: Season[];
};

export type League = {
  id: number;
  name: string;
  type: string;
  logo: string;
};

export type Season = {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: Coverage;
};

export type Coverage = {
  fixtures: Fixture;
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
};

export type Fixture = {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
};

export type FormFeedback = {
  msg: string;
  type: ValidationType
}
