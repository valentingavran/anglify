import { CardComponent, IconComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeadingDirective } from '../../../directives/heading/heading.directive';

@Component({
  selector: 'anglify-layouts',
  standalone: true,
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, IconComponent, HeadingDirective],
})
export class LayoutsComponent {
  public constructor(public router: Router) {}

  public openLayoutExample(example: string) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/examples/layouts/${example}`]));
    window.open(url, '_blank');
  }
}
