import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ttCaps]'
})
export class CapsDirective implements AfterViewInit {

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let children = this.hostElement.nativeElement.querySelectorAll('label, button');
    children.forEach((element: HTMLElement) => {
      this.renderer.addClass(element, 'caps')
    });
  }

}
