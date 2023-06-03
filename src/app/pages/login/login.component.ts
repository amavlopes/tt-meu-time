import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'tt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group(
    {
      apiKey: ['', Validators.required],
    },
    { udpateOn: 'blur' }
  );

  constructor(private fb: FormBuilder) {}

  get apiKey(): AbstractControl {
    return this.loginForm.get('apiKey') as FormControl;
  }

  onSubmit() {
    if (!this.loginForm.valid) return;
    const apiKey = this.apiKey.value.trim();
  }

  resetForm() {
    this.loginForm.reset();
  }
}
