import { ButtonComponent, SnackbarService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './indefinitely.component.html',
  styleUrls: ['./indefinitely.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
})
export default class IndefinitelyComponent {
  public constructor(private readonly snackbarService: SnackbarService) {}

  public openSnackbar() {
    this.snackbarService
      .open$({
        data: {
          label: "Hello, I'm a snackbar",
          actions: { label: 'Dismiss' },
        },
        timeout: 0,
      })
      .subscribe({
        next: data => {
          console.log('snackbar page: data:', data);
        },
        complete: () => {
          console.log('snackbar page: closed');
        },
      });
  }
}
