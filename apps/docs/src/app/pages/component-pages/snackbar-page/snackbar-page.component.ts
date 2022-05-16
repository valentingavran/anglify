import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-snackbar-page',
  templateUrl: './snackbar-page.component.html',
  styleUrls: ['./snackbar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarPageComponent {}
