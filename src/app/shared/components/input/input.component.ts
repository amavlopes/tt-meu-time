import { Component, Input } from '@angular/core';

import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Validation } from '@app/shared/types/types';

@Component({
  selector: 'tt-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: InputComponent
  }]
})
export class InputComponent implements ControlValueAccessor {

  value: any;
  disabled = false;
  touched = false;

  onTouched!: Function;
  onChange!: Function;

  @Input() label!: string;
  @Input() placeholder = '';

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.markAsTouched();
  }

  onClick() {
    this.markAsTouched();
  }

  markAsTouched() {
    if(!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

}
