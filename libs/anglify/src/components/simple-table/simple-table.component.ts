import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'anglify-simple-table',
  standalone: true,
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTableComponent {
  /**
   * Displays the header while scrolling and not only at the very top.
   */
  @Input() public fixedHeader = false;

  /**
   * Displays the footer while scrolling and not only at the very bottom.
   */
  @Input() public fixedFooter = false;

  /**
   * Sets the height for the component.
   */
  @HostBinding('style.--anglify-simple-table-fixed-height')
  @HostBinding('class.anglify-simple-table-fixed-height')
  @Input()
  public fixedHeight: string | null = null;
}
