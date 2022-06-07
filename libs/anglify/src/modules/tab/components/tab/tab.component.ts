import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RIPPLE } from '../../../../composables/ripple/ripple.provider';
import { RippleService } from '../../../../composables/ripple/ripple.service';
import { createSettingsProvider } from '../../../../factories/settings.factory';
import { toBoolean } from '../../../../utils/functions';
import { BooleanLike } from '../../../../utils/interfaces';
import { SlotDirective } from '../../../common/directives/slot/slot.directive';
import { DEFAULT_TAB_SETTINGS, TAB_SETTINGS } from '../../tab-settings.token';
import { EntireTabSettings } from '../../tab.interface';

@Component({
  selector: 'anglify-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireTabSettings>('anglifyTabSettings', DEFAULT_TAB_SETTINGS, TAB_SETTINGS), RIPPLE],
})
export class TabComponent implements AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  @Input() public label?: string;

  @Input() public set active(value: BooleanLike) {
    this._active$.next(toBoolean(value));
    if (toBoolean(value)) {
      this.activeChange.next();
    }
  }

  public get active() {
    return this._active$.value;
  }

  private readonly _active$ = new BehaviorSubject<boolean>(false);
  public active$ = this._active$.asObservable();

  @Input()
  public set ripple(value: BooleanLike) {
    this.rippleService.active = toBoolean(value);
  }

  public get ripple(): boolean {
    return this.rippleService.active;
  }

  @Input()
  public set state(value: BooleanLike) {
    this.rippleService.state = toBoolean(value);
  }

  public get state() {
    return this.rippleService.state;
  }

  @Output() public activeChange = new EventEmitter<void>();

  public constructor(
    @Self() @Inject('anglifyTabSettings') public settings: EntireTabSettings,
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly rippleService: RippleService
  ) {
    this.ripple = this.settings.ripple;
    this.state = this.settings.state;
  }

  public ngAfterViewInit(): void {
    const children = Array.from(this.elementRef.nativeElement.children);
    const hasTopIcon = this.searchIcon(children, 'top');

    if (hasTopIcon) {
      this.elementRef.nativeElement.classList.add('anglify-tab-has-top-icon');
    }
  }

  private searchIcon(children: Element[], attributeName: string): boolean {
    return children.some(child => {
      if (child.classList.contains('anglify-tab-label')) {
        const tabLabelChildren = Array.from(child.children);
        return tabLabelChildren.some(tabLabelChild => {
          if (tabLabelChild.tagName === 'ANGLIFY-ICON') {
            const value = Array.from(tabLabelChild.attributes).some(attribute => attribute.name === attributeName);
            return Boolean(value);
          }
          return false;
        });
      }
      return false;
    });
  }
}
