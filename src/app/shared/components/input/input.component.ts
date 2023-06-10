import { Component, Input } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Validation } from '@app/shared/types/types';

@Component({
  selector: 'tt-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() validations!: Array<Validation>;

  ngOnInit() {

  }

  onInput() {
    for (let {message} of this.validations) {
      if (!!message) message = '';
    }
  }

}
