import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, Self } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { createSettingsProvider } from '../../factories/settings.factory';
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
export class DividerComponent implements EntireDividerSettings {
  @HostBinding('class.vertical')
  @Input()
  public vertical = this.settings.vertical;

  @HostBinding('class.inset')
  @Input()
  public inset = this.settings.inset;

  public constructor(@Self() @Inject('anglifyDividerSettings') private readonly settings: EntireDividerSettings) {}
}
