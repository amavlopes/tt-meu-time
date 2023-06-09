import { Component, Input } from '@angular/core';

@Component({
  selector: 'tt-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {

  @Input() icon!: string;

}
