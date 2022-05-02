import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { RIPPLE } from 'libs/anglify/src/composables/ripple/ripple.provider';
import { RippleService } from 'libs/anglify/src/composables/ripple/ripple.service';
import { bindClassToNativeElement, toBoolean } from 'libs/anglify/src/utils/functions';
import { BehaviorSubject } from 'rxjs';
import type { BooleanLike } from '../../../../utils/interfaces';
import { AppendDirective } from '../../directives/append/append.directive';
import { PrependDirective } from '../../directives/prepend/prepend.directive';

@UntilDestroy()
@Component({
  selector: 'anglify-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RIPPLE],
})
export class ListItemComponent {
  @ContentChild(AppendDirective) public readonly appendDirective?: AppendDirective;
  @ContentChild(PrependDirective) public readonly prependDirective?: PrependDirective;

  @Input()
  public set active(value: BooleanLike) {
    this.active$.next(toBoolean(value));
  }

  public get active() {
    return this.active$.value;
  }

  @Input() public dense: BooleanLike = false;
  @Input() public disabled: BooleanLike = false;

  /**
   * Allow text selection inside anglify-list-item. This prop uses {@link https://developer.mozilla.org/en-US/docs/Web/CSS/user-select user-select}
   */
  @Input() public set selectable(value: BooleanLike) {
    this.selectable$.next(toBoolean(value));
  }

  public get selectable() {
    return this.selectable$.value;
  }

  @Input() public set ripple(value: BooleanLike) {
    this.rippleService.active = toBoolean(value);
  }

  @Input() public set state(value: BooleanLike) {
    this.rippleService.state = toBoolean(value);
  }

  public get state() {
    return this.rippleService.state;
  }

  @Output() public readonly onClick = new EventEmitter<void>();

  public readonly active$ = new BehaviorSubject<boolean>(false);
  public readonly selectable$ = new BehaviorSubject<boolean>(false);

  public constructor(private readonly elementRef: ElementRef<HTMLElement>, private readonly rippleService: RippleService) {
    bindClassToNativeElement(this, this.active$, this.elementRef.nativeElement, 'active');
    bindClassToNativeElement(this, this.selectable$, this.elementRef.nativeElement, 'selectable');
  }

  @HostListener('click')
  // @ts-expect-error
  private click() {
    this.onClick.next();
  }
}
