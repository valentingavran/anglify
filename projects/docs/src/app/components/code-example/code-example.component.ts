import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, NEVER, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const EXAMPLE_FOLDER_URL = environment.exampleFolderURL;

@Component({
  selector: 'app-code-example[component][example]',
  templateUrl: './code-example.component.html',
  styleUrls: ['./code-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeExampleComponent implements OnInit {
  @ViewChild('container', { static: true, read: ViewContainerRef }) public container!: ViewContainerRef;

  @Input() public component!: string;

  @Input()
  public set example(value: string) {
    this.example$.next(value);
  }

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

  public switchView(view: 'code' | 'template' | 'style'): void {
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

  public ngOnInit(): void {
    void this.loadComponent(this.container);
  }

  private async loadComponent(vcr: ViewContainerRef): Promise<void> {
    const example = this.example$.value;
    if (example) {
      const component: { default: Type<any> } = await import(`../../examples/${this.component}/${example}/${example}.component`);
      vcr.createComponent(this.componentFactoryResolver.resolveComponentFactory(component.default));
      this.cdr.markForCheck();
    }
  }
}
