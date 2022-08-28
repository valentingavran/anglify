import { SimpleTableComponent } from '@anglify/components';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { InjectableDocumentation, ModifierType } from '../../app.interface';

@Component({
  selector: 'app-service-api',
  standalone: true,
  templateUrl: './service-api.component.html',
  styleUrls: ['./service-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, SimpleTableComponent, AsyncPipe, NgForOf],
})
export class ServiceAPIComponent {
  @Input() public set documentation(documentation: InjectableDocumentation | undefined) {
    this.documentation$.next(documentation);
  }

  public get documentation() {
    return this.documentation$.value;
  }

  private readonly documentation$ = new BehaviorSubject<InjectableDocumentation | undefined>(undefined);

  public publicProperties$ = this.documentation$.pipe(
    map(documentation => {
      if (!documentation) return undefined;
      const properties = documentation.properties.filter(property => property.modifierKind.includes(ModifierType.Public));
      if (properties.length === 0) return undefined;
      return properties;
    })
  );

  public publicMethods$ = this.documentation$.pipe(
    map(documentation => {
      if (!documentation || !documentation.methods) return;
      const methods = documentation.methods.filter(method => method.modifierKind.includes(ModifierType.Public));
      if (methods.length === 0) return undefined;
      return methods;
    })
  );
}
