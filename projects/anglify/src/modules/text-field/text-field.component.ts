import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, HostBinding, Input } from '@angular/core';
import { InputDirective } from './directives/input.directive';
import { TextFieldStyle } from './text-field.interface';
import { tap } from 'rxjs/operators';
import { BooleanLike } from '../../utils/interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LabelDirective } from './directives/label/label.directive';
import { isBooleanLikeTrue } from '../../utils/functions';

@UntilDestroy()
@Component({
  selector: 'anglify-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent implements AfterViewInit {
  @ContentChild(InputDirective) private readonly input?: InputDirective;
  @ContentChild(LabelDirective) private readonly label?: LabelDirective;

  @Input() public type: TextFieldStyle = 'filled';
  @Input() public hint?: string;
  @Input('persistent-hint') public persistentHint: BooleanLike = false;
  @Input('persistent-placeholder') public persistentPlaceholder: BooleanLike = false;

  public constructor(private readonly elementRef: ElementRef) {}

  @HostBinding('class')
  private get classList(): string {
    const classNames = [`text-field-type-${this.type}`];
    if (isBooleanLikeTrue(this.persistentHint)) {
      classNames.push('persistent-hint');
    }
    if (isBooleanLikeTrue(this.persistentPlaceholder)) {
      classNames.push('persistent-placeholder');
    }
    if (this.label) {
      classNames.push('has-label');
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
              this.elementRef.nativeElement.classList.add('focused');
            } else {
              this.elementRef.nativeElement.classList.remove('focused');
            }
          })
        )
        .subscribe();

      this.input.floating$
        .pipe(
          untilDestroyed(this),
          tap(floating => {
            if (floating) {
              this.elementRef.nativeElement.classList.add('floating');
            } else {
              this.elementRef.nativeElement.classList.remove('floating');
            }
          })
        )
        .subscribe();

      this.input.readonly$
        .pipe(
          untilDestroyed(this),
          tap(readonly => {
            if (readonly) {
              this.elementRef.nativeElement.classList.add('readonly');
            } else {
              this.elementRef.nativeElement.classList.remove('readonly');
            }
          })
        )
        .subscribe();

      this.input.disabled$
        .pipe(
          untilDestroyed(this),
          tap(disabled => {
            if (disabled) {
              this.elementRef.nativeElement.classList.add('disabled');
            } else {
              this.elementRef.nativeElement.classList.remove('disabled');
            }
          })
        )
        .subscribe();
    } else {
      throw new Error('An input field that has an anglifyInput directive must be added to the anglify-text-field component for it to work');
    }
  }
}
