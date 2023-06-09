import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ttPrimary]',
})
export class PrimaryDirective implements AfterViewInit {

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let child = this.hostElement.nativeElement.children[0];
    this.renderer.addClass(child, 'primary');
  }
}
