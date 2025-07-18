import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlightDiscount]',
})
export class HighlightDiscountDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  // @HostListener('mouseenter') highlight() {
  //   this.el.nativeElement.style.backgroundColor = 'lightyellow';
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.el.nativeElement.style.backgroundColor = '';
  // }
}
