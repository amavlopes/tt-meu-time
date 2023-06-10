import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ttLarge]'
})
export class LargeDirective implements AfterViewInit {

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let children = this.hostElement.nativeElement.querySelectorAll('label, button, input');
    children.forEach((element: HTMLElement) => {
      this.renderer.addClass(element, 'large')
    });
  }

}
