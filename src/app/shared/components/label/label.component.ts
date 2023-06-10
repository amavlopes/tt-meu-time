import { Component, Input } from '@angular/core';

@Component({
  selector: 'tt-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {

  @Input() message!: string;

}
