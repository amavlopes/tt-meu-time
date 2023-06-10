import { Component, Input } from '@angular/core';
import { Validation, ValidationType } from '@app/shared/types/types';

@Component({
  selector: 'tt-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {

  @Input() message!: string;
  @Input() type!: ValidationType;

}
