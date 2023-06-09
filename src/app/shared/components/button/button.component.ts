import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tt-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() label!: string;
  @Input() icon!: string;
  @Input() disabled = false;

  @Output() click = new EventEmitter();

  handleClick() {
    this.click.emit();
  }

}
