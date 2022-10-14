import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Self } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { createSettingsProvider } from '../../factories/settings.factory';
import { bindClassToNativeElement } from '../../utils/functions';
import { DEFAULT_DIVIDER_SETTINGS, DIVIDER_SETTINGS } from './divider-settings.token';
import { EntireDividerSettings } from './divider.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-divider',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireDividerSettings>('anglifyDividerSettings', DEFAULT_DIVIDER_SETTINGS, DIVIDER_SETTINGS)],
})
export class DividerComponent {
  public get vertical() {
    return this.vertical$.value;
  }

  /**
   * Sets the orientation of the divider to vertical.
   */
  @Input() public set vertical(value: boolean) {
    this.vertical$.next(value);
  }

  public get inset() {
    return this.inset$.value;
  }

  /**
   * Enables the inset of the divider.
   */
  @Input() public set inset(value: boolean) {
    this.inset$.next(value);
  }

  protected readonly vertical$ = new BehaviorSubject(this.settings.vertical);

  private readonly inset$ = new BehaviorSubject(this.settings.inset);

  public constructor(
    @Self() @Inject('anglifyDividerSettings') private readonly settings: EntireDividerSettings,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    bindClassToNativeElement(this, this.vertical$, this.elementRef.nativeElement, 'vertical');
    bindClassToNativeElement(this, this.inset$, this.elementRef.nativeElement, 'inset');
  }
}
