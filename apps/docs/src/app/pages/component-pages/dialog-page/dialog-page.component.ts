import { DialogService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogTestComponent } from './dialog-test.component';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPageComponent {
  public constructor(private readonly dialogService: DialogService) {}

  public openModal() {
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
