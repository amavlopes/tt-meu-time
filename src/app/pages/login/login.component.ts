import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { finalize, first } from 'rxjs';

import { AuthService } from '@core/services/auth.service';

type LoginForm = {
  apiKey: FormControl<string | null>;
};

@Component({
  selector: 'tt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public errorMessage = '';
  public pending = false;

  loginForm: FormGroup<LoginForm> = this.fb.group({
    apiKey: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  get apiKey() {
    return this.loginForm.get('apiKey') as FormControl;
  }

  onInput() {
    if (!!this.errorMessage) this.errorMessage = '';
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    const apiKey = this.apiKey.value.trim();
    this.pending = true;
    this.errorMessage = '';

    this.auth
      .login(apiKey)
      .pipe(
        first(),
        finalize(() => (this.pending = false))
      )
      .subscribe({
        next: () => {
          console.log('Go to teams module');
        },
        error: (err: Error) => {
          this.errorMessage = err.message;
        },
      });
  }
}
