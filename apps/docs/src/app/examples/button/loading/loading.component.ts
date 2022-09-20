import { ButtonComponent, IconComponent, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [ButtonComponent, IconComponent, SlotDirective],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoadingComponent {
  protected loading1 = false;

  protected loading2 = false;

  protected loading3 = false;

  protected loading4 = false;

  protected loading5 = false;

  protected loading6 = false;

  protected loading7 = false;
}
