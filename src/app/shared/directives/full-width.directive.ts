import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ttFullWidth]'
})
export class FullWidthDirective implements AfterViewInit {

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let children = this.hostElement.nativeElement.querySelectorAll('input, button, select, .icon');
    children.forEach((element: HTMLElement) => {
      this.renderer.addClass(element, 'full')
    });
  }

}
