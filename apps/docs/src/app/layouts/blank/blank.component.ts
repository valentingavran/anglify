import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'anglify-blank',
  standalone: true,
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class BlankComponent {}
