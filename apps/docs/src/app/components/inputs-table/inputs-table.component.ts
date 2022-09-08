import { ChipComponent, ItemGroupComponent, SlotDirective } from '@anglify/components';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, type Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { type APIConfig, type Documentation } from '../../app.interface';
import { ComponentAPIComponent } from '../component-api/component-api.component';
import { DirectiveAPIComponent } from '../directive-api/directive-api.component';
import { InterfaceAPIComponent } from '../interface-api/interface-api.component';
import { ServiceAPIComponent } from '../service-api/service-api.component';

@UntilDestroy()
@Component({
  standalone: true,
  templateUrl: './inputs-table.component.html',
  styleUrls: ['./inputs-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ItemGroupComponent,
    ChipComponent,
    ReactiveFormsModule,
    ComponentAPIComponent,
    ServiceAPIComponent,
    DirectiveAPIComponent,
    InterfaceAPIComponent,
    NgForOf,
    NgIf,
    AsyncPipe,
    HttpClientModule,
    SlotDirective,
  ],
})
export class InputsTableComponent {
  @Input() public set components(value: string) {
    this._components$.next(value);
  }

  @Input() public set directives(value: string) {
    this._directives$.next(value);
  }

  @Input() public set services(value: string) {
    this._services$.next(value);
  }

  @Input() public set interfaces(value: string) {
    this._interfaces$.next(value);
  }

  public selection = new FormControl(0);

  public constructor(private readonly httpClient: HttpClient) {
    this.httpClient
      .get(`assets/documentation.json`)
      .pipe(take(1))
      .subscribe(data => {
        this.documentation$.next(data as Documentation);
      });
  }

  public _components$ = new BehaviorSubject<string | undefined>(undefined);

  public _directives$ = new BehaviorSubject<string | undefined>(undefined);

  public _services$ = new BehaviorSubject<string | undefined>(undefined);

  public _interfaces$ = new BehaviorSubject<string | undefined>(undefined);

  public documentation$ = new BehaviorSubject<Documentation | null>(null);

  public config$: Observable<APIConfig> = combineLatest([this._components$, this._directives$, this._services$, this._interfaces$]).pipe(
    map(([components, directives, services, interfaces]) => {
      const config: APIConfig = {
        components: components ? components.replaceAll(' ', '').split(',') : [],
        directives: directives ? directives.replaceAll(' ', '').split(',') : [],
        services: services ? services.replaceAll(' ', '').split(',') : [],
        interfaces: interfaces ? interfaces.replaceAll(' ', '').split(',') : [],
      };

      return config;
    })
  );

  public selectables$ = this.config$.pipe(
    map(config => {
      const components = config.components ?? [];
      const directives = config.directives ?? [];
      const services = config.services ?? [];
      const interfaces = config.interfaces ?? [];
      return [...components, ...directives, ...services, ...interfaces];
    })
  );

  public selectedName$ = combineLatest([this.selection.valueChanges.pipe(startWith(this.selection.value)), this.selectables$]).pipe(
    map(([index, selectables]) => selectables[index!])
  );

  public components$ = combineLatest([this.documentation$, this.config$]).pipe(
    map(([documentation, config]) => {
      const components = config.components ?? [];
      return documentation?.components.filter(component => components.includes(component.name));
    })
  );

  public services$ = combineLatest([this.documentation$, this.config$]).pipe(
    map(([documentation, config]) => {
      const services = config.services ?? [];
      return documentation?.injectables.filter(injectable => services.includes(injectable.name));
    })
  );

  public directives$ = combineLatest([this.documentation$, this.config$]).pipe(
    map(([documentation, config]) => {
      const directives = config.directives ?? [];
      return documentation?.directives.filter(directive => directives.includes(directive.name));
    })
  );

  public interfaces$ = combineLatest([this.documentation$, this.config$]).pipe(
    map(([documentation, config]) => {
      const interfaces = config.interfaces ?? [];
      return documentation?.interfaces.filter(item => interfaces.includes(item.name));
    })
  );
}
