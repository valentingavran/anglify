import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
  QueryList,
  ViewChild,
  type AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { TabComponent } from '../tab/tab.component';

@UntilDestroy()
@Component({
  selector: 'anglify-tab-group',
  standalone: true,
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent implements ControlValueAccessor, AfterViewInit {
  @ContentChildren(TabComponent) private readonly allTabs?: QueryList<TabComponent>;

  @ViewChild('indicator') private readonly indicator!: ElementRef<HTMLElement>;

  @Input() public set value(value: number) {
    this.writeValue(value);
  }

  @Output() public readonly valueChange = new EventEmitter<number>();

  private readonly tabs$ = new BehaviorSubject<TabComponent[]>([]);

  private readonly unsubscribeAll$ = new Subject<void>();

  private readonly destroySelectPreviousSubscription$ = new Subject<void>();

  private readonly destroySelectNextSubscription$ = new Subject<void>();

  public onChange: (...args: any[]) => void = () => {};

  public onTouch: (...args: any[]) => void = () => {};

  @HostBinding('attr.role') protected readonly role = 'tablist';

  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    this.tabs$.pipe(untilDestroyed(this)).subscribe(tabs => {
      for (const [index, tab] of tabs.entries()) {
        // eslint-disable-next-line rxjs/no-nested-subscribe, rxjs/no-unsafe-takeuntil
        tab.active$.pipe(untilDestroyed(this), takeUntil(this.unsubscribeAll$), filter(Boolean)).subscribe(() => {
          this.onSelectedTabChange(tab, index);
        });
      }
    });
  }

  public registerOnChange(fn: (...args: any[]) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void) {
    this.onTouch = fn;
  }

  /**
   * Selects tab with given index
   */
  public writeValue(value: number) {
    const tab = this.tabs$.value[value] as TabComponent | null | undefined;
    if (tab) this.onSelectedTabChange(tab);
  }

  private onSelectedTabChange(tab: TabComponent, index?: number) {
    this.indicator.nativeElement.style.width = `${tab.elementRef.nativeElement.offsetWidth}px`;
    this.indicator.nativeElement.style.left = `${tab.elementRef.nativeElement.offsetLeft}px`;
    this.deselectAllOthers(tab);
    this.destroySelectPreviousSubscription$.next();
    tab.onSelectPrevious.pipe(untilDestroyed(this), takeUntil(this.destroySelectPreviousSubscription$)).subscribe(() => {
      this.selectPrevious(tab);
    });
    tab.onSelectNext.pipe(untilDestroyed(this), takeUntil(this.destroySelectNextSubscription$)).subscribe(() => {
      this.selectNext(tab);
    });

    if (index !== undefined) {
      this.onChange(index);
      this.valueChange.emit(index);
    }
  }

  private deselectAllOthers(exception: TabComponent) {
    for (const tab of this.tabs$.value) {
      if (tab !== exception) tab.active = false;
    }
  }

  private selectPrevious(tab: TabComponent) {
    const index = this.tabs$.value.indexOf(tab);
    if (index > 0) {
      const newTab = this.tabs$.value[index - 1];
      newTab.active = true;
      newTab.elementRef.nativeElement.focus();
    }
  }

  private selectNext(tab: TabComponent) {
    const index = this.tabs$.value.indexOf(tab);
    if (index < this.tabs$.value.length - 1) {
      const newTab = this.tabs$.value[index + 1];
      newTab.active = true;
      newTab.elementRef.nativeElement.focus();
    }
  }

  public ngAfterViewInit() {
    if (this.allTabs) {
      this.allTabs.changes
        .pipe(
          untilDestroyed(this),
          startWith(this.allTabs),
          map((tabs: QueryList<TabComponent>) => tabs.toArray())
        )
        .subscribe(tabs => {
          this.unsubscribeAll$.next();
          this.tabs$.next(tabs);
        });
    }

    setTimeout(() => this.elementRef.nativeElement.classList.add('anglify-tab-group-transitions'), 0);
  }
}
