import { SimpleTableComponent } from '@anglify/components';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import type { InterfaceDocumentation } from '../../app.interface';

@Component({
  selector: 'app-interface-api',
  standalone: true,
  templateUrl: './interface-api.component.html',
  styleUrls: ['./interface-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, SimpleTableComponent, AsyncPipe, NgForOf],
})
export class InterfaceAPIComponent {
  public get documentation() {
    return this.documentation$.value;
  }

  @Input() public set documentation(documentation: InterfaceDocumentation | undefined) {
    this.documentation$.next(documentation);
  }

  private readonly documentation$ = new BehaviorSubject<InterfaceDocumentation | undefined>(undefined);

  public properties$ = this.documentation$.pipe(
    map(documentation => {
      if (!documentation || documentation.properties.length === 0) return;
      return documentation.properties;
    })
  );
}
