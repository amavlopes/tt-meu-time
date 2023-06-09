import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tt-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() label!: string;
  @Input() disabled!: boolean;

  @Output() click = new EventEmitter();

  handleClick() {
    this.click.emit();
  }

}
