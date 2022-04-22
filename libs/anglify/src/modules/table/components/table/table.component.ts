import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'anglify-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input()
  public fixedHeader = false;

  @Input()
  public fixedFooter = false;

  @Input()
  @HostBinding('style.--anglify-table-fixed-height')
  @HostBinding('class.anglify-table-fixed-height')
  public fixedHeight: string | null = null;
}
