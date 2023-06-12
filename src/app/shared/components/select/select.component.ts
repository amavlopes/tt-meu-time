import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tt-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: SelectComponent
  }]
})
export class SelectComponent implements ControlValueAccessor {

  value!: any;
  disabled = false;
  touched = false;

  onChange!: Function;
  onTouched!: Function;

  @Input() id!: string;
  @Input() label!: string;
  @Input() defaultValue: string | null = null;
  @Input() items!: any[];

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

  onSelectChange(event: Event) {
    this.value = (event.target as HTMLSelectElement).value;
    if (this.value === "null") this.value = null;
    this.onChange(this.value);
    this.markAsTouched();
  }

  onClick() {
    this.markAsTouched();
  }

  markAsTouched() {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

}
