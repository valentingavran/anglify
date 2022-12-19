import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  QueryList,
  Self,
  type OnInit,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { RippleService } from '../../composables/ripple/ripple.service';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { INTERNAL_ICONS } from '../../tokens/internal-icons.token';
import { bindClassToNativeElement } from '../../utils/functions';
import { IconComponent } from '../icon/icon.component';
import { InternalIconSetDefinition } from '../icon/icon.interface';
import { CHIP_SETTINGS, DEFAULT_CHIP_SETTINGS } from './chip-settings.token';
import { ChipAppearance, EntireChipSettings } from './chip.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-chip',
  standalone: true,
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireChipSettings>('anglifyChipSettings', DEFAULT_CHIP_SETTINGS, CHIP_SETTINGS), RIPPLE],
  imports: [IconComponent, NgIf, FindSlotPipe, SlotOutletDirective],
})
export class ChipComponent implements EntireChipSettings, OnInit {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  public get active() {
    return this.active$.value;
  }

  @Input() public set active(value: boolean) {
    this.active$.next(value);
  }

  @Input('filter') public filter = this.settings.filter;

  @Input() public appearance: ChipAppearance = this.settings.appearance;

  public get ripple(): boolean {
    return this.rippleService.active;
  }

  @Input() public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  private readonly active$ = new BehaviorSubject(this.settings.active);

  public constructor(
    @Self() @Inject('anglifyChipSettings') private readonly settings: EntireChipSettings,
    @Inject(INTERNAL_ICONS) protected readonly internalIcons: InternalIconSetDefinition,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly rippleService: RippleService
  ) {
    bindClassToNativeElement(this, this.active$, this.elementRef.nativeElement, 'active');
  }

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
    const classNames: string[] = [this.appearance];

    if (this.filter) {
      classNames.push('filter');
    }

    return classNames.join(' ');
  }

  @HostBinding('tabindex')
  // @ts-expect-error: Value is used
  private readonly tabindex = 0;
}
