import { ButtonComponent, IconComponent } from '@anglify/components';
import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  HostBinding,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';
import { BehaviorSubject, NEVER, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const EXAMPLE_FOLDER_URL = environment.exampleFolderURL;

@Component({
  selector: 'app-code-example[component][example]',
  standalone: true,
  templateUrl: './code-example.component.html',
  styleUrls: ['./code-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, IconComponent, HighlightModule, MarkdownModule, HttpClientModule, ButtonComponent],
})
export class CodeExampleComponent implements OnInit {
  @ViewChild('container', { static: true, read: ViewContainerRef }) public container!: ViewContainerRef;

  @Input() public component!: string;

  @Input()
  public set example(value: string) {
    this.example$.next(value);
  }

  @HostBinding('class.hide-overflow')
  @Input()
  public hideOverflow = true;

  private readonly example$ = new BehaviorSubject<string>('');
  public readonly selectedView$ = new BehaviorSubject<'code' | 'template' | 'style' | null>(null);

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

  public switchView(view: 'code' | 'template' | 'style') {
    if (this.selectedView$.value === view) {
      this.selectedView$.next(null);
    } else {
      this.selectedView$.next(view);
    }
  }

  public constructor(
    private readonly httpClient: HttpClient,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    void this.loadComponent(this.container);
  }

  private async loadComponent(vcr: ViewContainerRef) {
    const example = this.example$.value;
    if (example) {
      const component = (await import(`../../examples/${this.component}/${example}/${example}.component`)) as { default: Type<any> };
      vcr.createComponent(this.componentFactoryResolver.resolveComponentFactory(component.default));
      this.cdr.markForCheck();
    }
  }
}
