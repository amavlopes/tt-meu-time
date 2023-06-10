import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ttOutlined]'
})
export class OutlinedDirective implements AfterViewInit {

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let children = this.hostElement.nativeElement.querySelectorAll('button');
    children.forEach((element: HTMLElement) => {
      this.renderer.addClass(element, 'outlined')
    });
  }

}
