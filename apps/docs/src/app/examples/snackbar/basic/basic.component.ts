import { SnackbarService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first } from 'rxjs';

@Component({
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComponent {
  public constructor(private readonly snackbarService: SnackbarService) {}

  public openSnackbar() {
    this.snackbarService
      .open({ data: { label: "Hello, I'm a snackbar" } })
      .pipe(first())
      .subscribe();
  }
}

export default BasicComponent;
