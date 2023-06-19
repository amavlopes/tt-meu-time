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
    requests?: string;
  };
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response:
    | ResponseStatus
    | Array<Country | number | LeagueResponse | TeamResponse | PlayerResponse>;
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
  fixtures: FixtureCoverage;
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
};

export type FixtureCoverage = {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
};

export type FormFeedback = {
  msg: string;
  type: ValidationType;
};

export type TeamResponse = {
  team: Team;
  venue: Venue;
};

export type Team = {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
};

export type Venue = {
  id: 556;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
};

export type Loading = {
  [key: string]: {
    status: boolean;
    message: string;
  };
};

export type PlayerResponse = {
  player: Player,
  statistics: any
}

export type Player = {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: {
    date: string;
    place: string;
    country: string;
  };
  nationality: string;
  height: string;
  weight: string;
  injured: false;
  photo: string;
};

export type Lineup = {
  formation: string,
  played: number
}

export type FixturePlayer = {
  home: number,
  away: number,
  total: number
};

export type FixturesPlayer = {
  played: FixturePlayer,
  wins: FixturePlayer,
  draws: FixturePlayer,
  loses: FixturePlayer
}
