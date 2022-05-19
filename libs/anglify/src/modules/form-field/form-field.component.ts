import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  QueryList,
  Self,
  ViewChild,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { InputDirective } from './directives/input.directive';
import { DEFAULT_FORM_FIELD_SETTINGS, FORM_FIELD_SETTINGS } from './form-field-settings.token';
import type { FormFieldSettings, FormFieldType } from './form-field.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { toBoolean } from '../../utils/functions';
import type { BooleanLike } from '../../utils/interfaces';
import { SlotDirective } from '../common/directives/slot/slot.directive';

@UntilDestroy()
@Component({
  selector: 'anglify-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<FormFieldSettings>('anglifyFormFieldSettings', DEFAULT_FORM_FIELD_SETTINGS, FORM_FIELD_SETTINGS)],
})
export class FormFieldComponent implements AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;
  @ContentChild(InputDirective) public readonly input?: InputDirective;

  @ViewChild('prependItem') public readonly prependItem?: ElementRef<HTMLElement>;

  @Input() public type: FormFieldType = this.settings.defaultType;
  @Input() public hint?: string;
  @Input('persistent-hint') public persistentHint: BooleanLike = this.settings.persistentHint;
  @Input('persistent-placeholder') public persistentPlaceholder: BooleanLike = this.settings.persistentPlaceholder;
  @Input() public prefix?: string;
  @Input() public suffix?: string;
  @Input() public label?: string;
  @Input() public dense: BooleanLike = this.settings.dense;
  @Input('hide-details') public hideDetails: BooleanLike = this.settings.hideDetails;

  @Input()
  public set error(value: string) {
    this.errorAction.next(value);
  }

  @Input() public counter: BooleanLike = false;

  public get _counter() {
    return toBoolean(this.counter);
  }

  public readonly outlinedLabelPrefixMargin$ = new BehaviorSubject<string>('0px');
  private readonly errorAction = new BehaviorSubject<string | null>(null);
  public readonly error$ = this.errorAction.pipe(
    tap(error => {
      if (error) {
        this.nativeElement.classList.add('error', 'persistent-hint');
      } else {
        this.nativeElement.classList.remove('error');
        if (!toBoolean(this.persistentHint)) {
          this.nativeElement.classList.remove('persistent-hint');
        }
      }
    })
  );

  private readonly nativeElement = this.elementRef.nativeElement;

  public constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cdr: ChangeDetectorRef,
    @Self() @Inject('anglifyFormFieldSettings') private readonly settings: Required<FormFieldSettings>
  ) {}

  @HostBinding('class')
  protected get classList() {
    const classNames = [`form-field-type-${this.type}`];
    if (toBoolean(this.persistentHint)) {
      classNames.push('persistent-hint');
    }
    if (toBoolean(this.persistentPlaceholder)) {
      classNames.push('persistent-placeholder');
    }
    if (toBoolean(this.dense)) {
      classNames.push('dense');
    }
    if (SlotDirective.getSlot(this.slots, 'label') || this.label) {
      classNames.push('has-label');
    }
    if (toBoolean(this.hideDetails)) {
      classNames.push('hide-details');
    }
    return classNames.join(' ');
  }

  public ngAfterViewInit() {
    if (this.input) {
      this.input.focused$
        .pipe(
          untilDestroyed(this),
          tap(focused => {
            if (focused) {
              this.nativeElement.classList.add('focused');
            } else {
              this.nativeElement.classList.remove('focused');
            }
          })
        )
        .subscribe();

      this.input.floating$
        .pipe(
          untilDestroyed(this),
          tap(floating => {
            if (floating) {
              this.nativeElement.classList.add('floating');
            } else {
              this.nativeElement.classList.remove('floating');
            }
          })
        )
        .subscribe();

      this.input.readonly$
        .pipe(
          untilDestroyed(this),
          tap(readonly => {
            if (readonly) {
              this.nativeElement.classList.add('readonly');
            } else {
              this.nativeElement.classList.remove('readonly');
            }
          })
        )
        .subscribe();

      this.input.disabled$
        .pipe(
          untilDestroyed(this),
          tap(disabled => {
            if (disabled) {
              this.nativeElement.classList.add('disabled');
            } else {
              this.nativeElement.classList.remove('disabled');
            }
          })
        )
        .subscribe();

      combineLatest([this.input.focused$, this.input.floating$])
        .pipe(
          untilDestroyed(this),
          map(([focused, floating]) => {
            const prependItemWidth = `-${this.prependItem!.nativeElement.offsetWidth}px`;
            return (focused || floating || toBoolean(this.persistentPlaceholder)) && this.type === 'outlined' ? prependItemWidth : '';
          }),
          tap(margin => {
            this.outlinedLabelPrefixMargin$.next(margin);
            this.cdr.detectChanges();
          })
        )
        .subscribe();

      this.input.invalid$
        .pipe(
          untilDestroyed(this),
          tap(valid => {
            this.errorAction.next(valid);
          })
        )
        .subscribe();
    } else {
      throw new Error('An input field that has an anglifyInput directive must be added to the anglify-form-field component for it to work');
    }
  }
}
