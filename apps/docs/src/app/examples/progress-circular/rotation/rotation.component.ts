import { ProgressCircularComponent } from '@anglify/components';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  standalone: true,
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressCircularComponent, AsyncPipe],
})
export default class RotationComponent {
  public progress$ = interval(600).pipe(
    map(value => value % 11),
    map(value => value * 10)
  );
}
