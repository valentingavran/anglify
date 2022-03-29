import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RotationComponent {
  public progress$ = interval(600).pipe(
    map(value => value % 11),
    map(value => value * 10)
  );
}

export default RotationComponent;
