import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ttSecondary]'
})
export class SecondaryDirective implements AfterViewInit {

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let child = this.hostElement.nativeElement.children[0];
    this.renderer.addClass(child, 'secondary');
  }

}
