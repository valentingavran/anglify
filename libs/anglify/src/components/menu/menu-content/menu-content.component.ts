import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, QueryList } from '@angular/core';
import { focusableElementsString } from '../../../composables/position/position.interface';
import type { SlotDirective } from '../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../directives/slot-outlet/slot-outlet.directive';
import { FindSlotPipe } from '../../../pipes/find-slot/find-slot.pipe';

@Component({
  selector: 'anglify-menu-content',
  standalone: true,
  imports: [CommonModule, SlotOutletDirective, FindSlotPipe],
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContentComponent {
  @Input() public slots?: QueryList<SlotDirective>;

  @HostBinding('style.--anglify-menu-max-height')
  @Input()
  public maxHeight?: string;

  @HostBinding('style.--anglify-menu-max-width')
  @Input()
  public maxWidth?: string;

  @HostBinding('style.--anglify-menu-min-width')
  @Input()
  public minWidth?: string;

  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  public focusFirstItem() {
    setTimeout(() => {
      const firstItem = this.elementRef.nativeElement.querySelectorAll('anglify-list-item') as NodeListOf<HTMLElement>;
      if (firstItem[0]) firstItem[0].focus();
    }, 0);
  }

  public focusLastItem() {
    setTimeout(() => {
      const lastItem = this.elementRef.nativeElement.querySelectorAll('anglify-list-item') as NodeListOf<HTMLElement>;
      if (lastItem[lastItem.length - 1]) lastItem[lastItem.length - 1].focus();
    }, 0);
  }

  public focusNextItem() {
    setTimeout(() => {
      const current = this.elementRef.nativeElement.querySelector(':focus') as HTMLElement;
      if (!current) {
        this.focusFirstItem();
        return;
      }

      const siblings = current.parentElement?.querySelectorAll(focusableElementsString) as NodeListOf<HTMLElement>;
      const index = Array.from(siblings).indexOf(current);
      if (index >= 0) {
        const next = siblings[index + 1];
        if (next) next.focus();
      }
    }, 0);
  }

  public focusPreviousItem() {
    setTimeout(() => {
      const current = this.elementRef.nativeElement.querySelector(':focus') as HTMLElement;
      if (!current) {
        this.focusFirstItem();
        return;
      }

      const siblings = current.parentElement?.querySelectorAll(focusableElementsString) as NodeListOf<HTMLElement>;
      const index = Array.from(siblings).indexOf(current);
      if (index >= 0) {
        const previous = siblings[index - 1];
        if (previous) previous.focus();
      }
    }, 0);
  }
}
