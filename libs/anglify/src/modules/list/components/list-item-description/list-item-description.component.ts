import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'anglify-list-item-description',
  templateUrl: './list-item-description.component.html',
  styleUrls: ['./list-item-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemDescriptionComponent {
  /** Limits the number of lines. */
  @Input() @HostBinding('style.-webkit-line-clamp') public lineClamp = 1;

  @HostBinding('class')
  protected get classList() {
    return 'anglify-list-item-description';
  }
}
