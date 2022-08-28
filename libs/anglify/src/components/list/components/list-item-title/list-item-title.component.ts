import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'anglify-list-item-title',
  standalone: true,
  templateUrl: './list-item-title.component.html',
  styleUrls: ['./list-item-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemTitleComponent {
  /** Limits the number of lines. */
  @Input() @HostBinding('style.-webkit-line-clamp') public lineClamp = 1;

  @HostBinding('class')
  protected get classList() {
    return 'anglify-list-item-title';
  }
}
