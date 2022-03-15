import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'anglify-list-item-description',
  templateUrl: './list-item-description.component.html',
  styleUrls: ['./list-item-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemDescriptionComponent {
  @HostBinding('style.-webkit-line-clamp')
  @Input()
  public lineClamp = 1;

  @HostBinding('class')
  private get classList(): string {
    return 'anglify-list-item-description';
  }
}
