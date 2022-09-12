import { SimpleTableComponent } from '@anglify/components';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

type Style = {
  defaultValue: string;
  name: string;
};

@Component({
  selector: 'app-styling-table',
  standalone: true,
  templateUrl: './styling-table.component.html',
  styleUrls: ['./styling-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SimpleTableComponent, NgForOf, AsyncPipe, NgIf, HttpClientModule],
})
export class StylingTableComponent {
  @Input() public set component(component: string) {
    this.httpClient
      .get(`assets/style-definitions/${component}.json`)
      .pipe(take(1))
      .subscribe(data => {
        this.cssVariables$.next(data as Style[]);
      });
  }

  public constructor(private readonly httpClient: HttpClient) {}

  public cssVariables$ = new BehaviorSubject<Style[]>([]);
}
