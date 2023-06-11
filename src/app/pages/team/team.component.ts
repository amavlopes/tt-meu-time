import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '@app/core/services/country.service';

import { Country } from '@app/shared/types/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tt-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {

  form!: FormGroup;
  defaultValue: string | null = null;
  countries: Array<Country> | [] = [];
  errorMessage = '';
  subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private countriesService: CountryService) {
    this.form = this.fb.group({
      country: [this.defaultValue , Validators.required],
      season: [ {value: this.defaultValue, disabled: true} , Validators.required]
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
    if(!!countriesList.length) {
      this.countries = countriesList;
    } else {
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
  }

  getSeasonList() {}

  onChange(control: any) {
    if (!!this.errorMessage) this.clearMessage();
  }

  clearMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
