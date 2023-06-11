import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Country } from '@app/shared/types/types';

@Component({
  selector: 'tt-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {

  form!: FormGroup;
  defaultValue: string | null = null;

  countries: Array<Country> = [
    { name: 'Brazil', code: 'BR'},
    { name: 'Portugal', code: 'PT'},
    { name: 'Italy', code: 'IT'},
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      country: [this.defaultValue, Validators.required]
    });
  }

  get country(): FormControl {
    return this.form.get('country') as FormControl;
  }

}
