import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'anglify-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutsComponent {
  public constructor(public router: Router) {}

  public openLayoutExample(example: string) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/examples/layouts/${example}`]));
    window.open(url, '_blank');
  }
}
