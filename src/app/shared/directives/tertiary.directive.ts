import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ttTertiary]'
})
export class TertiaryDirective implements AfterViewInit {

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let children = this.hostElement.nativeElement.querySelectorAll('input, button');
    children.forEach((element: HTMLElement) => {
      this.renderer.addClass(element, 'tertiary')
    });
  }

}
