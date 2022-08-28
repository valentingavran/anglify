import { ButtonComponent, SnackbarService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
})
export default class BasicComponent {
  public constructor(private readonly snackbarService: SnackbarService) {}

  public openSnackbar() {
    this.snackbarService.open({ data: { label: "Hello, I'm a snackbar" } });
  }
}
