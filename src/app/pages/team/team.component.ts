import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, finalize } from 'rxjs';

import { Country, League, LeagueResponse } from '@shared/types/types';
import { CountryService } from '@core/services/country.service';
import { SeasonService } from '@core/services/season.service';
import { LeagueService } from '@app/core/services/league.service';

@Component({
  selector: 'tt-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  countries: Array<Country> = [];
  seasons: Array<number> = [];
  leagues: Array<League> = [];

  form!: FormGroup;
  defaultValue: string | null = null;
  errorMessage = '';
  subscription: Subscription = new Subscription();

  loadingLeagues = false;

  constructor(
    private fb: FormBuilder,
    private countriesService: CountryService,
    private seasonService: SeasonService,
    private leagueService: LeagueService
  ) {
    this.form = this.fb.group({
      country: [this.defaultValue, Validators.required],
      season: [this.defaultValue],
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

  ngOnInit(): void {
    this.manageCountryList();
    this.manageSeasonList();

    this.updateFormByCountry();
    this.updateFormBySeason();
  }

  manageCountryList() {
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
        this.errorMessage = err.message;
      },
    });
    this.subscription.add(subscription);
  }

  manageSeasonList() {
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

  updateFormByCountry() {
    this.country?.valueChanges.subscribe((country: string) => {
      if (!country) return;

      this.resetControlsAfterCurrentOne('country');

      let params = { country };
      this.getLeagueList(params);
    });
  }

  updateFormBySeason() {
    this.season?.valueChanges.subscribe((season: string) => {
      if (!season) return;

      this.resetControlsAfterCurrentOne('season');

      let params = { country: this.country.value, season };
      this.getLeagueList(params);
    });
  }

  resetControlsAfterCurrentOne(control: string) {
    const controlKeys = Object.keys(this.form.value);
    const currentIndex = controlKeys.findIndex((c) => c === control);

    controlKeys.forEach((key, index) => {
      if (index > currentIndex) {
        this.form.get(key)?.setValue(this.defaultValue);
        this.form.get(key)?.setErrors(null);
        this.form.get(key)?.markAsPristine();
      }
    });
  }

  getLeagueList<T extends { [key: string]: string }>(options: T) {

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
          this.leagues = response;
        },
        error: (err: Error) => {
          this.errorMessage = err.message;
        },
      });
    this.subscription.add(subscription);
  }

  enableDisableControl(condition: boolean, control: FormControl) {
    if (condition) {
      control.enable();
    } else {
      control.disable();
    }
  }

  onChange() {
    if (!!this.errorMessage) this.clearMessage();
  }

  clearMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
