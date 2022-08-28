import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Inject, OnDestroy, OnInit, Self } from '@angular/core';
import { DEFAULT_SNACKBAR_SETTINGS, SNACKBAR_SETTINGS } from './snackbar-settings.token';
import { EntireSnackbarSettings, SnackbarContext, SnackbarInteralDismissReason } from './snackbar.interface';
import { SNACKBAR_CONTEXT } from './snackbar.service';
import { createSettingsProvider } from '../../factories/settings.factory';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'anglify-snackbar',
  standalone: true,
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireSnackbarSettings>('anglifySnackbarSettings', DEFAULT_SNACKBAR_SETTINGS, SNACKBAR_SETTINGS)],
  imports: [NgIf, ButtonComponent],
})
export class SnackbarComponent implements OnInit, OnDestroy {
  public timeout: number | null = null;

  public constructor(
    @Inject(SNACKBAR_CONTEXT) public readonly context: SnackbarContext,
    @Self() @Inject('anglifySnackbarSettings') public settings: EntireSnackbarSettings
  ) {}

  @HostBinding('class')
  protected get classList() {
    const classNames: string[] = [this.context.position ?? this.settings.position];

    if (this.context.stacked ?? this.settings.stacked) {
      classNames.push('stacked');
    }

    return classNames.join(' ');
  }

  public ngOnInit() {
    if (this.context.timeout ?? this.settings.timeout) {
      this.timeout = window.setTimeout(() => {
        this.context.completeWith({ reason: SnackbarInteralDismissReason.Timeout });
        this.timeout = null;
      }, this.context.timeout ?? this.settings.timeout);
    }
  }

  public ngOnDestroy() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }

  public dismiss() {
    this.context.completeWith({ reason: this.context.data?.actions?.id ?? SnackbarInteralDismissReason.Dismissed });
  }
}
