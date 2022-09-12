import { SimpleTableComponent } from '@anglify/components';
import { NgIf, AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ModifierType, type ComponentDocumentation } from '../../app.interface';

@Component({
  selector: 'app-component-api',
  standalone: true,
  templateUrl: './component-api.component.html',
  styleUrls: ['./component-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, SimpleTableComponent, AsyncPipe, NgForOf],
})
export class ComponentAPIComponent {
  public get documentation() {
    return this.documentation$.value;
  }

  @Input() public set documentation(documentation: ComponentDocumentation | undefined) {
    this.documentation$.next(documentation);
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
