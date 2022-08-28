import { ButtonComponent, DialogService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import DialogTestComponent from './dialog-test.component';

@Component({
  standalone: true,
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
})
export default class SimpleComponent {
  public constructor(private readonly dialogService: DialogService) {}

  public openDialog() {
    this.dialogService.open(DialogTestComponent);
  }
}
