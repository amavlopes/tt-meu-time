import { Component, Input } from '@angular/core';

@Component({
  selector: 'tt-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() defaultValue: string | null = null;
  @Input() items!: Array<{name: string}>;

}
