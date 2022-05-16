import { ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit, Self } from '@angular/core';
import { DEFAULT_SNACKBAR_SETTINGS, SNACKBAR_SETTINGS } from './snackbar-settings.token';
import { SnackbarContext, SnackbarSettings } from './snackbar.interface';
import { SNACKBAR_CONTEXT } from './snackbar.service';
import { createSettingsProvider } from '../../factories/settings.factory';

@Component({
  selector: 'anglify-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<SnackbarSettings>('anglifySnackbarSettings', DEFAULT_SNACKBAR_SETTINGS, SNACKBAR_SETTINGS)],
})
export class SnackbarComponent implements OnInit {
  public constructor(
    @Inject(SNACKBAR_CONTEXT) public readonly context: SnackbarContext,
    @Self() @Inject('anglifySnackbarSettings') public settings: Required<SnackbarSettings>
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
    if (this.context.duration ?? this.settings.duration) {
      setTimeout(() => this.context.completeWith('internal.duration'), this.context.duration ?? this.settings.duration);
    }
  }

  public dismiss() {
    this.context.completeWith(this.context.data?.actions?.id ?? 'internal.dismissed');
  }
}
