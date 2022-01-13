import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Optional,
  ViewChild,
} from '@angular/core';
import { InputDirective } from './directives/input.directive';
import { FormFieldSettings, FormFieldType } from './form-field.interface';
import { map, tap } from 'rxjs/operators';
import { BooleanLike } from '../../utils/interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LabelDirective } from './directives/label/label.directive';
import { isBooleanLikeTrue } from '../../utils/functions';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { FORM_FIELD_SETTINGS } from './form-field-settings.token';

@UntilDestroy()
@Component({
  selector: 'anglify-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements AfterViewInit {
  @ContentChild(InputDirective) public readonly input?: InputDirective;
  @ContentChild(LabelDirective) public readonly labelDirective?: LabelDirective;
  @ViewChild('prependItem') public readonly prependItem?: ElementRef;

  @Input() public type: FormFieldType = 'filled';
  @Input() public hint?: string;
  @Input('persistent-hint') public persistentHint: BooleanLike = false;
  @Input('persistent-placeholder') public persistentPlaceholder: BooleanLike = false;
  @Input('prepend-icon') public prependIcon?: string;
  @Input('prepend-outer-icon') public prependOuterIcon?: string;
  @Input('append-icon') public appendIcon?: string;
  @Input('append-outer-icon') public appendOuterIcon?: string;
  @Input() public prefix?: string;
  @Input() public suffix?: string;
  @Input() public label?: string;
  @Input() public dense: BooleanLike = false;
  @Input('hide-details') public hideDetails: BooleanLike = false;

  @Input()
  public set error(value: string) {
    this.errorAction.next(value);
  }

  @Input() public counter: BooleanLike = false;

  public get _counter(): boolean {
    return isBooleanLikeTrue(this.counter);
  }

  public readonly outlinedLabelPrefixMargin$ = new BehaviorSubject<string>('0px');
  private readonly errorAction = new BehaviorSubject<string | null>(null);
  public readonly error$ = this.errorAction.pipe(
    tap(error => {
      if (error) {
        this.nativeElement.classList.add('error', 'persistent-hint');
      } else {
        this.nativeElement.classList.remove('error');
        if (!isBooleanLikeTrue(this.persistentHint)) {
          this.nativeElement.classList.remove('persistent-hint');
        }
      }
    })
  );

  private readonly nativeElement: HTMLElement;

  public constructor(
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef,
    @Optional() @Inject(FORM_FIELD_SETTINGS) private readonly settings?: Required<FormFieldSettings>
  ) {
    if (settings) {
      this.type = settings.defaultType;
      this.dense = settings.dense;
      this.persistentHint = settings.persistentHint;
      this.persistentPlaceholder = settings.persistentPlaceholder;
      this.hideDetails = settings.hideDetails;
    }
    this.nativeElement = this.elementRef.nativeElement;
  }

  @HostBinding('class')
  private get classList(): string {
    const classNames = [`form-field-type-${this.type}`];
    if (isBooleanLikeTrue(this.persistentHint)) {
      classNames.push('persistent-hint');
    }
    if (isBooleanLikeTrue(this.persistentPlaceholder)) {
      classNames.push('persistent-placeholder');
    }
    if (isBooleanLikeTrue(this.dense)) {
      classNames.push('dense');
    }
    if (this.labelDirective || this.label) {
      classNames.push('has-label');
    }
    if (isBooleanLikeTrue(this.hideDetails)) {
      classNames.push('hide-details');
    }
    return classNames.join(' ');
  }

  public ngAfterViewInit(): void {
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
            const prependItemWidth = `-${(this.prependItem?.nativeElement as HTMLElement).offsetWidth}px`;
            return (focused || floating || isBooleanLikeTrue(this.persistentPlaceholder)) && this.type === 'outlined'
              ? prependItemWidth
              : '';
          }),
          tap(margin => {
            this.outlinedLabelPrefixMargin$.next(margin);
            this.cdr.detectChanges();
          })
        )
        .subscribe();

      this.input.valid$
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
