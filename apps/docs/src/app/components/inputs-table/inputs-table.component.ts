import { ChipComponent, ItemGroupComponent } from '@anglify/components';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { APIConfig, Documentation } from '../../app.interface';
import { ComponentAPIComponent } from '../component-api/component-api.component';
import { DirectiveAPIComponent } from '../directive-api/directive-api.component';
import { InterfaceAPIComponent } from '../interface-api/interface-api.component';
import { ServiceAPIComponent } from '../service-api/service-api.component';

@UntilDestroy()
@Component({
  selector: 'app-inputs-table',
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
  ],
})
export class InputsTableComponent {
  @Input() public set config(value: APIConfig) {
    this.config$.next(value);
  }

  public get config() {
    return this.config$.value;
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

  public documentation$ = new BehaviorSubject<Documentation | null>(null);
  public config$ = new BehaviorSubject<APIConfig>({});

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
      return documentation?.interfaces.filter(i => interfaces.includes(i.name));
    })
  );
}
