import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

interface Style {
  name: string;
  defaultValue: string;
}

@Component({
  selector: 'app-styling-table',
  templateUrl: './styling-table.component.html',
  styleUrls: ['./styling-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylingTableComponent {
  @Input()
  public set forComponent(component: string) {
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
