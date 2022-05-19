import { SnackbarService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first } from 'rxjs';

@Component({
  templateUrl: './indefinitely.component.html',
  styleUrls: ['./indefinitely.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndefinitelyComponent {
  public constructor(private readonly snackbarService: SnackbarService) {}

  public openSnackbar() {
    this.snackbarService
      .open({
        data: {
          label: "Hello, I'm a snackbar",
          actions: { label: 'Dismiss' },
        },
        timeout: 0,
      })
      .pipe(first())
      .subscribe({
        complete: () => {
          console.log('Snackbar closed');
        },
        next: data => {
          console.log('Snackbar data:', data);
        },
      });
  }
}

export default IndefinitelyComponent;
