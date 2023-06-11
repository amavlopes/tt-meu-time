import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, finalize, first } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

type LoginForm = {
  apiKey: FormControl<string | null>;
};

@Component({
  selector: 'tt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy{

  errorMessage = '';
  pending = false;
  subscription: Subscription = new Subscription();

  loginForm: FormGroup<LoginForm> = this.fb.group({
    apiKey: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private changeDetection: ChangeDetectorRef) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/team']);
  }

  get apiKey() {
    return this.loginForm.get('apiKey') as FormControl;
  }

  onInput() {
    if (!!this.errorMessage) this.clearMessage();
  }

  onSubmit() {

    this.clearMessage();

    if (!this.loginForm.valid) return;

    this.pending = true;

    const apiKey = this.apiKey.value.trim();

    const loginSubscription = this.auth
      .login(apiKey)
      .pipe(
        first(),
        finalize(()=> {
          this.pending = false;
          this.changeDetection.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/team']);
        },
        error: (err: Error) => {
          this.errorMessage = err.message;
        },
      });

      this.subscription.add(loginSubscription);
  }

  clearMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
