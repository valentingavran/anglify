import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'anglify-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  /** Displays the header while scrolling and not only at the very top. */
  @Input() public fixedHeader = false;

  /** Displays the footer while scrolling and not only at the very bottom. */
  @Input() public fixedFooter = false;

  /** Sets the height for the component. */
  @HostBinding('style.--anglify-table-fixed-height')
  @HostBinding('class.anglify-table-fixed-height')
  @Input()
  public fixedHeight: string | null = null;
}
