import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  Self,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { CHIP_SETTINGS, DEFAULT_CHIP_SETTINGS } from './chip-settings.token';
import { ChipAppearance, EntireChipSettings } from './chip.interface';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { RippleService } from '../../composables/ripple/ripple.service';
import { createSettingsProvider } from '../../factories/settings.factory';
import { INTERNAL_ICONS } from '../../tokens/internal-icons.token';
import { bindClassToNativeElement } from '../../utils/functions';

import { SlotDirective } from '../common/directives/slot/slot.directive';
import { InternalIconSetDefinition } from '../icon/icon.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireChipSettings>('anglifyChipSettings', DEFAULT_CHIP_SETTINGS, CHIP_SETTINGS), RIPPLE],
})
export class ChipComponent implements OnInit {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  @Input()
  public set active(value: boolean) {
    this.active$.next(value);
  }

  public get active() {
    return this.active$.value;
  }

  @Input('filter') public filter = this.settings.filter;

  @Input() public appearance: ChipAppearance = this.settings.appearance;

  @Input()
  public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  public get ripple(): boolean {
    return this.rippleService.active;
  }

  @Output() public readonly onClick = new EventEmitter<void>();

  public readonly active$ = new BehaviorSubject<boolean>(false);

  public constructor(
    @Inject(INTERNAL_ICONS) public readonly internalIcons: InternalIconSetDefinition,
    @Self() @Inject('anglifyChipSettings') public settings: EntireChipSettings,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly rippleService: RippleService
  ) {
    bindClassToNativeElement(this, this.active$, this.elementRef.nativeElement, 'active');
  }

  public ngOnInit(): void {
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
  // @ts-expect-error
  private readonly tabindex = 0;

  @HostListener('click')
  // @ts-expect-error
  private click() {
    this.onClick.next();
  }
}
