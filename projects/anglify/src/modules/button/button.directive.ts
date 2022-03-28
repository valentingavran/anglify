import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import type { ButtonAppearance } from './button.interface';
import { isBooleanLikeTrue } from '../../utils/functions';
import type { BooleanLike, ComponentSize } from '../../utils/interfaces';

@Directive({
  selector: '[anglifyButton]',
})
export class ButtonDirective implements OnInit {
  @Input() public appearance: ButtonAppearance = 'filled';

  /**
   * Expands the button to 100% of available space.
   */
  @Input() public block: BooleanLike = false;

  /**
   * The Size property works with all buttons except the extended-fab,because this button type has only one size.
   * FAB buttons also have only the sizes `small`, `regular` and `large`.
   */
  @Input() public size: ComponentSize = 'regular';

  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  public ngOnInit() {
    const children = Array.from(this.elementRef.nativeElement.children);
    const hasLeftIcon = children.some(child => {
      if (child.tagName === 'ANGLIFY-ICON') {
        const right = Array.from(child.attributes).some(attribute => attribute.name === 'left');
        return Boolean(right);
      }
      return false;
    });

    const hasRightIcon = children.some(child => {
      if (child.tagName === 'ANGLIFY-ICON') {
        const right = Array.from(child.attributes).some(attribute => attribute.name === 'right');
        return Boolean(right);
      }
      return false;
    });

    if (hasLeftIcon) {
      this.elementRef.nativeElement.classList.add('has-left-icon');
    }
    if (hasRightIcon) {
      this.elementRef.nativeElement.classList.add('has-right-icon');
    }
  }

  @HostBinding('class')
  protected get classList() {
    const classNames = ['anglify-button', this.appearance, `button-size-${this.size}`];

    if (isBooleanLikeTrue(this.block)) {
      classNames.push('block');
    }

    return classNames.join(' ');
  }
}
