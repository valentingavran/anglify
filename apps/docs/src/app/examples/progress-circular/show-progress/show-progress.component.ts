import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-show-progress',
  templateUrl: './show-progress.component.html',
  styleUrls: ['./show-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowProgressComponent {
  public progress$ = interval(600).pipe(
    map(value => value % 11),
    map(value => value * 10)
  );
}

export default ShowProgressComponent;
