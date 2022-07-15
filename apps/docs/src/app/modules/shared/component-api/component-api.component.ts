import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ComponentDocumentation, ModifierType } from '../../../app.interface';

@Component({
  selector: 'app-component-api',
  templateUrl: './component-api.component.html',
  styleUrls: ['./component-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentAPIComponent {
  @Input() public set documentation(documentation: ComponentDocumentation | undefined) {
    this.documentation$.next(documentation);
  }

  public get documentation() {
    return this.documentation$.value;
  }

  private readonly documentation$ = new BehaviorSubject<ComponentDocumentation | undefined>(undefined);

  public publicMethods$ = this.documentation$.pipe(
    map(documentation => {
      if (!documentation || !documentation.methodsClass) return;
      const methods = documentation.methodsClass.filter(method => method.modifierKind.includes(ModifierType.Public));
      if (methods.length === 0) return undefined;
      return methods;
    })
  );
}
