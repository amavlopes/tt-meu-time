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
  Loading,
  Team,
  TeamResponse,
  ValidationType,
} from '@shared/types/types';
import { CountryService } from '@core/services/country.service';
import { SeasonService } from '@core/services/season.service';
import { LeagueService } from '@app/core/services/league.service';
import { TeamService } from '@app/core/services/team.service';

@Component({
  selector: 'tt-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {

  loading = false;
  countries: Array<Country> = [];
  seasons: Array<number> = [];
  leagues: Array<League> = [];
  teams: Array<Team> = [];

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
      team: [
        { value: this.defaultValue, disabled: true },
        Validators.required,
      ],
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
    controlKeys.forEach(key => {
      loadingStatus.push({
        [key]: false
      })
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

  getLeagueList<T extends { [key: string]: string }>(options: T) {
    this.loading = true;
    this.enableDisableControl(false, this.league);

    const subscription = this.leagueService
      .getLeagues(options)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.enableDisableControl(!!this.leagues.length, this.league);
        })
      )
      .subscribe({
        next: (stream: LeagueResponse[]) => {
          const response = stream.map((s) => s.league);
          this.leagues = response;
        },
        error: (err: Error) => {
          this.errorMessage = err.message;
        },
      });
    this.subscription.add(subscription);
  }

  getTeamList<T extends { [key: string]: string }>(options: T) {
    this.loading = true;
    this.enableDisableControl(false, this.team);

    const subscription = this.teamService
      .getTeams(options)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.enableDisableControl(!!this.teams.length, this.team);
        })
      )
      .subscribe({
        next: (stream: TeamResponse[]) => {
          const response = stream.map((s) => s.team);
          this.teams = response;
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
        // this.form.get(key)?.updateValueAndValidity();
      }
    });
  }

  disableControlsAfterCurrentOne(control: string, except?: string) {
    let controlKeys = this.getControlsAfterCurrentOne(this.form.value);
    let currentIndex = this.getCurrentIndex(controlKeys, control);

    controlKeys.forEach((key, index) => {
      if (index > currentIndex) {
        this.form.get(key)?.disable();
        // this.form.get(key)?.updateValueAndValidity();
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
