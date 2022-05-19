import { DialogService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogTestComponent } from './dialog-test.component';

@Component({
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleComponent {
  public constructor(private readonly dialogService: DialogService) {}

  public openDialog() {
    this.dialogService.open(DialogTestComponent).subscribe({
      complete: () => {
        console.log('modal page: closed');
      },
      next: data => {
        console.log('modal page: data:', data);
      },
    });
  }
}
export default SimpleComponent;
