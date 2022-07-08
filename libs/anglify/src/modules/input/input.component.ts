import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, map } from 'rxjs';
import { InputAppearance } from './input.interface';
import { bindClassToNativeElement, bindObservableValueToNativeElement, observeOnResize, toBoolean } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';
import { SlotDirective } from '../common/directives/slot/slot.directive';

@UntilDestroy()
@Component({
  selector: 'anglify-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit, AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;
  @ViewChild('prependInner', { static: true }) private readonly prependInner?: ElementRef<HTMLElement>;
  @ViewChild('content', { static: true }) private readonly content?: ElementRef<HTMLElement>;
  @ViewChild('appendInner', { static: true }) private readonly appendInner?: ElementRef<HTMLElement>;
  @ViewChild('label', { static: true }) private readonly label?: ElementRef<HTMLElement>;
  @ViewChild('hintWrapper') private readonly hintWrapper?: ElementRef<HTMLElement>;
  @ViewChild('hintElement') private readonly hintElement?: ElementRef<HTMLElement>;

  @Input() public set appearance(appearance: InputAppearance) {
    this.appearance$.next(appearance);
  }

  public get appearance() {
    return this.appearance$.value;
  }

  @Input() public set disabled(disabled: BooleanLike) {
    this.disabled$.next(toBoolean(disabled));
  }

  public get disabled() {
    return this.disabled$.value;
  }

  @Input() public set focused(focused: BooleanLike) {
    this.focused$.next(toBoolean(focused));
  }

  public get focused() {
    return this.focused$.value;
  }

  @Input() public set floating(floating: BooleanLike) {
    this.floating$.next(toBoolean(floating));
  }

  public get floating() {
    return this.floating$.value;
  }

  public get hintOverflow() {
    return this.hintOverflow$.value;
  }

  @HostBinding('class.anglify-input-persistent-hint')
  @Input()
  public persistentHint = false;

  @HostBinding('class.anglify-input-hide-details')
  @Input()
  public hideDetails = false;

  @HostBinding('class.anglify-input-always-floating-label')
  @Input()
  public alwaysFloatingLabel = false;

  @HostBinding('class.anglify-input-dense')
  @Input()
  public dense = false;

  @Input() public set error(value: string | null | undefined) {
    this.error$.next(value);
  }

  public get error() {
    return this.error$.value;
  }

  @Input() public hint = '';
  @Input() public inputId?: string;
  @Input() public length?: number;
  @Input() public maxLength?: number;
  @Input() public counter = false;
  @Input() public readonly = false;

  @Output() public onInputClick = new EventEmitter<void>();

  private readonly appearance$ = new BehaviorSubject<InputAppearance>('filled');
  private readonly floating$ = new BehaviorSubject<boolean>(false);
  private readonly focused$ = new BehaviorSubject<boolean>(false);
  private readonly disabled$ = new BehaviorSubject<boolean>(false);
  public readonly hintOverflow$ = new BehaviorSubject<boolean>(false);
  public readonly error$ = new BehaviorSubject<string | null | undefined>(null);

  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    bindObservableValueToNativeElement(this, this.appearance$, this.elementRef.nativeElement, 'anglify-input-');
    bindClassToNativeElement(this, this.floating$, this.elementRef.nativeElement, 'anglify-input-floating');
    bindClassToNativeElement(this, this.focused$, this.elementRef.nativeElement, 'anglify-input-focused');
    bindClassToNativeElement(this, this.disabled$, this.elementRef.nativeElement, 'anglify-input-disabled');
    bindClassToNativeElement(this, this.error$.pipe(map(Boolean)), this.elementRef.nativeElement, 'anglify-input-error');
  }

  public ngOnInit() {
    if (this.prependInner?.nativeElement) {
      observeOnResize(this.prependInner.nativeElement)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.setPrependWidth(this.prependInner!.nativeElement.clientWidth);
        });
    }
    if (this.content?.nativeElement) {
      observeOnResize(this.content.nativeElement)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.setContentWidth(this.content!.nativeElement.clientWidth);
        });
    }
    if (this.appendInner?.nativeElement) {
      observeOnResize(this.appendInner.nativeElement)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.setAppendWidth(this.appendInner!.nativeElement.clientWidth);
        });
    }
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      // turn on transitions after view is initialized
      this.label?.nativeElement.classList.add('transitions');
    }, 0);
  }

  public isHintOverflowing() {
    if ((this.hintWrapper?.nativeElement.offsetHeight ?? 0) <= (this.hintElement?.nativeElement.offsetHeight ?? 0)) {
      this.setHintOverflow(true);
      return;
    }
    this.setHintOverflow(false);
  }

  private setPrependWidth(width: number) {
    this.elementRef.nativeElement.style.setProperty('--anglify-input-prepend-width', `${width}px`);
  }

  private setContentWidth(width: number) {
    this.elementRef.nativeElement.style.setProperty('--anglify-input-content-width', `${width}px`);
  }

  private setAppendWidth(width: number) {
    this.elementRef.nativeElement.style.setProperty('--anglify-input-append-width', `${width}px`);
  }

  private setHintOverflow(overflow: BooleanLike) {
    this.hintOverflow$.next(toBoolean(overflow));
  }
}
