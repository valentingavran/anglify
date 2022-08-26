import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { InterfaceDocumentation } from '../../../app.interface';

@Component({
  selector: 'app-interface-api',
  templateUrl: './interface-api.component.html',
  styleUrls: ['./interface-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterfaceAPIComponent {
  @Input() public set documentation(documentation: InterfaceDocumentation | undefined) {
    this.documentation$.next(documentation);
  }

  public get documentation() {
    return this.documentation$.value;
  }

  private readonly documentation$ = new BehaviorSubject<InterfaceDocumentation | undefined>(undefined);

  public properties$ = this.documentation$.pipe(
    map(documentation => {
      if (!documentation || documentation.properties.length === 0) return;
      const properties = documentation.properties;
      return properties;
    })
  );
}
