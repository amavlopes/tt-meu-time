import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, finalize } from 'rxjs';

import {
  Country,
  FormFeedback,
  League,
  LeagueResponse,
  Player,
  PlayerResponse,
  Team,
  TeamResponse,
  ValidationType,
} from '@shared/types/types';
import { CountryService } from '@core/services/country.service';
import { SeasonService } from '@core/services/season.service';
import { LeagueService } from '@app/core/services/league.service';
import { HttpOptions, TeamService } from '@app/core/services/team.service';

@Component({
  selector: 'tt-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  loadingLeagues = false;
  loadingTeams = false;
  loadingForm = false;

  countries: Array<Country> = [];
  seasons: Array<number> = [];
  leagues: Array<Pick<League, 'id' | 'name'>> = [];
  teams: Array<Pick<Team, 'id' | 'name'>> = [];
  players: Array<Pick<Player, 'name' | 'age' | 'nationality'>> = [];

  form!: FormGroup;
  defaultValue: string | null = null;
  errorMessage = '';
  formFeeback!: FormFeedback | undefined;
  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private countriesService: CountryService,
    private seasonService: SeasonService,
    private leagueService: LeagueService,
    private teamService: TeamService
  ) {
    this.form = this.fb.group({
      country: [this.defaultValue, Validators.required],
      season: [{ value: this.defaultValue, disabled: false }],
      league: [
        { value: this.defaultValue, disabled: true },
        Validators.required,
      ],
      team: [{ value: this.defaultValue, disabled: true }, Validators.required],
    });
  }

  get country(): FormControl {
    return this.form.get('country') as FormControl;
  }

  get season(): FormControl {
    return this.form.get('season') as FormControl;
  }

  get league(): FormControl {
    return this.form.get('league') as FormControl;
  }

  get team(): FormControl {
    return this.form.get('team') as FormControl;
  }

  ngOnInit(): void {
    this.getCountryList();
    this.getSeasonList();

    this.updateFormByCountry();
    this.updateFormBySeason();
    this.updateFormByLeague();
  }

  getControlsLoadingStatus(): Array<{ [key: string]: boolean }> {
    let controlKeys = Object.keys(this.form.value);
    const loadingStatus: Array<{ [key: string]: boolean }> = [];
    controlKeys.forEach((key) => {
      loadingStatus.push({
        [key]: false,
      });
    });
    return loadingStatus;
  }

  getCountryList() {
    let countryList = this.countriesService.getCachedCountries();

    if (!!countryList.length) {
      this.countries = countryList;
      return;
    }

    const subscription = this.countriesService.getCountries().subscribe({
      next: (stream: Country[]) => {
        this.countries = stream;
      },
      error: (err: Error) => {
        this.formFeeback = {
          msg: err.message,
          type: 'alert',
        };
      },
    });
    this.subscription.add(subscription);
  }

  getSeasonList() {
    let seasonList = this.seasonService.getCachedSeasons();

    if (!!seasonList.length) {
      this.seasons = seasonList;
      return;
    }

    const subscription = this.seasonService.getSeasons().subscribe({
      next: (stream: number[]) => {
        this.seasons = stream;
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
      },
    });
    this.subscription.add(subscription);
  }

  getLeagueList(options: HttpOptions) {
    this.loadingLeagues = true;
    this.enableDisableControl(false, this.league);

    const subscription = this.leagueService
      .getLeagues(options)
      .pipe(
        finalize(() => {
          this.loadingLeagues = false;
          this.enableDisableControl(!!this.leagues.length, this.league);
        })
      )
      .subscribe({
        next: (stream: LeagueResponse[]) => {
          const response = stream.map((s) => s.league);
          this.leagues = response.map((l: League) => ({ id: l.id, name: l.name }));;
        },
        error: (err: Error) => {
          this.errorMessage = err.message;
        },
      });
    this.subscription.add(subscription);
  }

  getTeamList(options: HttpOptions) {
    this.loadingTeams = true;
    this.enableDisableControl(false, this.team);

    const subscription = this.teamService
      .getTeams(options)
      .pipe(
        finalize(() => {
          this.loadingTeams = false;
          this.enableDisableControl(!!this.teams.length, this.team);
        })
      )
      .subscribe({
        next: (stream: TeamResponse[]) => {
          const response = stream.map((s) => s.team);
          this.teams = response.map((t: Team) => ({ id: t.id, name: t.name }));
        },
        error: (err: Error) => {
          this.errorMessage = err.message;
        },
      });
    this.subscription.add(subscription);
  }

  updateFormByCountry() {
    this.country?.valueChanges.subscribe((country: string) => {
      this.clearValidationMessage();

      if (!country) return;

      this.resetControlsAfterCurrentOne('country');

      let params = { country };
      this.getLeagueList(params);
    });
  }

  updateFormBySeason() {
    this.season?.valueChanges.subscribe((season: string) => {
      this.clearValidationMessage();

      if (!season) return;

      this.resetControlsAfterCurrentOne('season');

      if (!this.country.value) return;

      let params = { country: this.country.value, season };
      this.getLeagueList(params);
    });
  }

  updateFormByLeague() {
    this.league?.valueChanges.subscribe((league: string) => {
      this.clearValidationMessage();

      if (!league) return;

      this.resetControlsAfterCurrentOne('league');

      let params: any = { country: this.country.value, league };
      if (!!this.season.value)
        params = { ...params, season: this.season.value };
      this.getTeamList(params);
    });
  }

  setValidationMessage(msg: string, type: ValidationType) {
    this.formFeeback = { msg, type };
  }

  clearValidationMessage() {
    this.formFeeback = undefined;
  }

  resetControlsAfterCurrentOne(control: string, except?: string) {
    let controlKeys = this.getControlsAfterCurrentOne(this.form.value);
    let currentIndex = this.getCurrentIndex(controlKeys, control);

    controlKeys.forEach((key, index) => {
      if (index > currentIndex) {
        this.form.get(key)?.setValue(this.defaultValue);
      }
    });
  }

  disableControlsAfterCurrentOne(control: string, except?: string) {
    let controlKeys = this.getControlsAfterCurrentOne(this.form.value);
    let currentIndex = this.getCurrentIndex(controlKeys, control);

    controlKeys.forEach((key, index) => {
      if (index > currentIndex) {
        this.form.get(key)?.disable();
      }
    });
  }

  enableNextField(next: string) {
    this.form.get(next)?.enable();
  }

  getControlsAfterCurrentOne(formValue: any, except?: string): string[] {
    let controlKeys = Object.keys(formValue);
    controlKeys = !!except
      ? controlKeys.filter((c) => c !== except)
      : controlKeys;
    return controlKeys;
  }

  getCurrentIndex(controlKeys: string[], control: string) {
    return controlKeys.findIndex((c) => c === control);
  }

  enableDisableControl(condition: boolean, control: FormControl) {
    if (condition) {
      control.enable();
    } else {
      control.disable();
    }
  }

  OnChange() {}

  onSubmit() {

    if (!this.form.valid) return;

    this.loadingForm = true;
    this.getPlayerList();

  }

  getPlayerList() {
    const subscription = this.teamService
      .getPlayers(this.form.value)
      .pipe(
        finalize(() => {
          this.loadingForm = false;
          this.enableDisableControl(!!this.teams.length, this.team);
        })
      )
      .subscribe({
        next: (stream: PlayerResponse[]) => {
          const response = stream.map((s) => s.player);
          this.players = response.map((p: Player) => ({ name: p.name, age: p.age, nationality: p.nationality }));
          console.log('players: ', this.players);
        },
        error: (err: Error) => {
          this.errorMessage = err.message;
        },
      });
    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
