import { SimpleTableComponent } from '@anglify/components';
import { NgIf, AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ModifierType, type DirectiveDocumentation } from '../../app.interface';

@Component({
  selector: 'app-directive-api',
  standalone: true,
  templateUrl: './directive-api.component.html',
  styleUrls: ['./directive-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, SimpleTableComponent, AsyncPipe, NgForOf],
})
export class DirectiveAPIComponent {
  public get documentation() {
    return this.documentation$.value;
  }

  @Input() public set documentation(documentation: DirectiveDocumentation | undefined) {
    this.documentation$.next(documentation);
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
