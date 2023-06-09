import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ttLarge]'
})
export class LargeDirective implements AfterViewInit {

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let child = this.hostElement.nativeElement.children[0];
    this.renderer.addClass(child, 'large');
  }

}
