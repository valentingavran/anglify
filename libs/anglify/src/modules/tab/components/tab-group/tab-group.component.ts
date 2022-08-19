import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  HostBinding,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { TabComponent } from '../tab/tab.component';

@UntilDestroy()
@Component({
  selector: 'anglify-tab-group',
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

  private readonly tabs$ = new BehaviorSubject<TabComponent[]>([]);
  private readonly unsubscribeAll = new Subject<void>();
  private readonly destroySelectPreviousSubscription = new Subject<void>();
  private readonly destroySelectNextSubscription = new Subject<void>();

  public onChange: (...args: any[]) => void = () => {};
  public onTouch: (...args: any[]) => void = () => {};

  @HostBinding('attr.role') protected readonly role = 'tablist';

  public constructor() {
    this.tabs$.pipe(untilDestroyed(this)).subscribe(tabs => {
      tabs.forEach((tab, index) => {
        tab.active$.pipe(untilDestroyed(this), takeUntil(this.unsubscribeAll), filter(Boolean)).subscribe(() => {
          this.onSelectedTabChange(tab, index);
        });
      });
    });
  }

  public registerOnChange(fn: (...args: any[]) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void) {
    this.onTouch = fn;
  }

  /** Selects tab with given index */
  public writeValue(value: number) {
    const tab = this.tabs$.value[value] as TabComponent | null | undefined;
    if (tab) this.onSelectedTabChange(tab);
  }

  private onSelectedTabChange(tab: TabComponent, index?: number) {
    this.indicator.nativeElement.style.width = `${tab.elementRef.nativeElement.offsetWidth}px`;
    this.indicator.nativeElement.style.left = `${tab.elementRef.nativeElement.offsetLeft}px`;
    this.deselectAllOthers(tab);
    this.destroySelectPreviousSubscription.next();
    tab.onSelectPrevious.pipe(untilDestroyed(this), takeUntil(this.destroySelectPreviousSubscription)).subscribe(() => {
      this.selectPrevious(tab);
    });
    tab.onSelectNext.pipe(untilDestroyed(this), takeUntil(this.destroySelectNextSubscription)).subscribe(() => {
      this.selectNext(tab);
    });

    if (index) this.onChange(index);
  }

  private deselectAllOthers(exception: TabComponent) {
    this.tabs$.value.forEach(tab => {
      if (tab !== exception) tab.active = false;
    });
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
          map(tabs => tabs as QueryList<TabComponent>)
        )
        .subscribe(tabs => {
          this.unsubscribeAll.next();
          this.tabs$.next(tabs.toArray());
        });
    }
  }
}
