import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
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

  public onChange: (...args: any[]) => void = () => {};
  public onTouch: (...args: any[]) => void = () => {};

  public constructor() {
    this.tabs$.pipe(untilDestroyed(this)).subscribe(tabs => {
      tabs.forEach((tab, index) => {
        tab.active$.pipe(untilDestroyed(this), takeUntil(this.unsubscribeAll), filter(Boolean)).subscribe(() => {
          this.indicator.nativeElement.style.width = `${tab.elementRef.nativeElement.offsetWidth}px`;
          this.indicator.nativeElement.style.left = `${tab.elementRef.nativeElement.offsetLeft}px`;
          this.deselectAllOthers(tab);
          this.onChange(index);
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
    if (tab) {
      tab.active = true;
      this.deselectAllOthers(tab);
    }
  }

  private deselectAllOthers(exception: TabComponent) {
    this.tabs$.value.forEach(tab => {
      if (tab !== exception) {
        tab.active = false;
      }
    });
  }

  public ngAfterViewInit(): void {
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
