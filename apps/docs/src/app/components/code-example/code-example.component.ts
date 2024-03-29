import { ButtonComponent, IconComponent } from '@anglify/components';
import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Injector, Input, ViewChild, ViewContainerRef, type OnInit, type Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, NEVER, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { CopyButtonComponent } from '../copy-button/copy-button.component';

const EXAMPLE_FOLDER_URL = environment.exampleFolderURL;

@UntilDestroy()
@Component({
  standalone: true,
  templateUrl: './code-example.component.html',
  styleUrls: ['./code-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, IconComponent, HttpClientModule, ButtonComponent, HighlightPipe, CopyButtonComponent],
})
export class CodeExampleComponent implements OnInit {
  @ViewChild('container', { static: true, read: ViewContainerRef }) public container!: ViewContainerRef;

  @Input() public component!: string;

  public get example() {
    return this.example$.value;
  }

  @Input() public set example(value: string) {
    this.example$.next(value);
  }

  private readonly example$ = new BehaviorSubject<string>('');

  public readonly selectedView$ = new BehaviorSubject<'code' | 'style' | 'template' | null>(null);

  public readonly template$ = this.example$.pipe(
    switchMap(example => {
      if (example) {
        return this.httpClient
          .get(`${EXAMPLE_FOLDER_URL}${this.component}/${example}/${example}.component.html`, {
            responseType: 'text',
          })
          .pipe(catchError(() => NEVER));
      }

      return of('');
    })
  );

  public readonly style$ = this.example$.pipe(
    switchMap(example => {
      if (example) {
        return this.httpClient
          .get(`${EXAMPLE_FOLDER_URL}${this.component}/${example}/${example}.component.scss`, {
            responseType: 'text',
          })
          .pipe(catchError(() => NEVER));
      }

      return of('');
    })
  );

  public readonly code$ = this.example$.pipe(
    switchMap(example => {
      if (example) {
        return this.httpClient
          .get(`${EXAMPLE_FOLDER_URL}${this.component}/${example}/${example}.component.ts`, {
            responseType: 'text',
          })
          .pipe(catchError(() => NEVER));
      }

      return of('');
    })
  );

  public switchView(view: 'code' | 'style' | 'template') {
    if (this.selectedView$.value === view) {
      this.selectedView$.next(null);
    } else {
      this.selectedView$.next(view);
    }
  }

  public constructor(private readonly httpClient: HttpClient, private readonly injector: Injector) {}

  public ngOnInit() {
    void this.loadComponent();
  }

  private async loadComponent() {
    const example = this.example$.value;
    const selector = `${this.component}-${this.example}-example`;
    if (example) {
      if (customElements.get(selector) === undefined) {
        const component = (await import(`../../examples/${this.component}/${example}/${example}.component`)) as { default: Type<any> };
        customElements.define(selector, createCustomElement(component.default, { injector: this.injector }));
      }

      // add custom element to template
      (this.container.element.nativeElement as HTMLElement).append(document.createElement(`${this.component}-${this.example}-example`));
    }
  }
}
