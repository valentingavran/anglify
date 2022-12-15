import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, Self } from '@angular/core';
import { createSettingsProvider } from '../../factories/settings.factory';
import { DEFAULT_SIMPLE_TABLE_SETTINGS, SIMPLE_TABLE_SETTINGS } from './simple-table-settings.token';
import { EntireSimpleTableSettings } from './simple-table.interface';

@Component({
  selector: 'anglify-simple-table',
  standalone: true,
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireSimpleTableSettings>('anglifySimpleTableSettings', DEFAULT_SIMPLE_TABLE_SETTINGS, SIMPLE_TABLE_SETTINGS),
  ],
})
export class SimpleTableComponent implements EntireSimpleTableSettings {
  @Input() public fixedHeader = this.settings.fixedHeader;

  @Input() public fixedFooter = this.settings.fixedFooter;

  @HostBinding('style.--anglify-simple-table-fixed-height')
  @HostBinding('class.anglify-simple-table-fixed-height')
  @Input()
  public fixedHeight = this.settings.fixedHeight;

  public constructor(@Self() @Inject('anglifySimpleTableSettings') private readonly settings: EntireSimpleTableSettings) {}
}
