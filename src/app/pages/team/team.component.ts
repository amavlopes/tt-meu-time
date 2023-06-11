import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Country } from '@shared/types/types';
import { CountryService } from '@core/services/country.service';
import { SeasonService } from '@core/services/season.service';

@Component({
  selector: 'tt-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {

  countries: Array<Country> | [] = [];
  seasons: Array<number> | [] = [];

  form!: FormGroup;
  defaultValue: string | null = null;
  errorMessage = '';
  subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private countriesService: CountryService, private seasonService: SeasonService) {
    this.form = this.fb.group({
      country: [this.defaultValue , Validators.required],
      season: [ this.defaultValue , Validators.required]
    });
  }

  get country(): FormControl {
    return this.form.get('country') as FormControl;
  }

  get season(): FormControl {
    return this.form.get('season') as FormControl;
  }

  ngOnInit(): void {
    this.getCountryList();
    this.getSeasonList();
  }

  getCountryList() {
    const countriesList = this.countriesService.getCachedCountries();

    if (!!countriesList.length) {
      this.countries = countriesList;
      return;
     }

    const countrySubscription = this.countriesService.getCountries().subscribe({
      next: (countries: Array<Country> | []) => {
        this.countries = countries;
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
      },
    });

    this.subscription.add(countrySubscription);
  }

  getSeasonList() {
    const seasonsList = this.seasonService.getCachedSeasons();

    if(!!seasonsList.length) {
      this.seasons = seasonsList;
      return;
    }

    const seasonSubscription = this.seasonService.getSeasons().subscribe({
      next: (seasons: Array<number> | []) => {
        this.seasons = seasons;
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
      },
    });

    this.subscription.add(seasonSubscription);
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
