import { bindClassToNativeElement, ButtonComponent, IconComponent } from '@anglify/components';
import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  Input,
  ViewChild,
  ViewContainerRef,
  type OnInit,
  type Type,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, NEVER, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HighlightPipe } from '../../pipes/highlight.pipe';

const EXAMPLE_FOLDER_URL = environment.exampleFolderURL;

@UntilDestroy()
@Component({
  standalone: true,
  templateUrl: './code-example.component.html',
  styleUrls: ['./code-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, IconComponent, HttpClientModule, ButtonComponent, HighlightPipe],
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

  @Input('hide-overflow')
  public set hideOverflow(value: boolean | 'false' | 'true' | null | undefined) {
    if (value === 'false' || value === false) this.hideOverflow$.next(false);
    else this.hideOverflow$.next(true);
  }

  private readonly example$ = new BehaviorSubject<string>('');

  public readonly selectedView$ = new BehaviorSubject<'code' | 'style' | 'template' | null>(null);

  private hideOverflow$ = new BehaviorSubject<boolean>(true);

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

  public constructor(
    private readonly httpClient: HttpClient,
    private readonly injector: Injector,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    bindClassToNativeElement(this, this.hideOverflow$, this.elementRef.nativeElement, 'hide-overflow');
  }

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
