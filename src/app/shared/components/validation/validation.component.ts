import { Component, Input } from '@angular/core';

@Component({
  selector: 'tt-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {

  @Input() message!: string;
  @Input() type!: 'alert' | 'success' | 'warning';

}
