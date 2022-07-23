import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { DirectiveDocumentation, ModifierType } from '../../../app.interface';

@Component({
  selector: 'app-directive-api',
  templateUrl: './directive-api.component.html',
  styleUrls: ['./directive-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectiveAPIComponent {
  @Input() public set documentation(documentation: DirectiveDocumentation | undefined) {
    this.documentation$.next(documentation);
  }

  public get documentation() {
    return this.documentation$.value;
  }

  private readonly documentation$ = new BehaviorSubject<DirectiveDocumentation | undefined>(undefined);

  public publicMethods$ = this.documentation$.pipe(
    map(documentation => {
      if (!documentation || !documentation.methodsClass) return;
      const methods = documentation.methodsClass.filter(method => method.modifierKind.includes(ModifierType.Public));
      if (methods.length === 0) return undefined;
      return methods;
    })
  );
}
