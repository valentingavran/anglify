import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'anglify-list-item-title',
  templateUrl: './list-item-title.component.html',
  styleUrls: ['./list-item-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemTitleComponent {
  @HostBinding('style.-webkit-line-clamp')
  @Input()
  public lineClamp = 1;

  @HostBinding('class')
  protected get classList() {
    return 'anglify-list-item-title';
  }
}
