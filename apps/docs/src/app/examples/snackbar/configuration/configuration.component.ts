import { SnackbarService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationComponent {
  public constructor(private readonly snackbarService: SnackbarService) {}

  public openSnackbar() {
    this.snackbarService.open({ data: { label: 'Some test', actions: { label: 'Dismiss' } } }).subscribe({
      complete: () => {
        console.log('snackbar page: closed');
      },
      next: data => {
        console.log('snackbar page: data:', data);
      },
    });
  }
}

export default ConfigurationComponent;
