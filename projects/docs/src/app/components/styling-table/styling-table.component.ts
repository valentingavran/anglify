import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

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
