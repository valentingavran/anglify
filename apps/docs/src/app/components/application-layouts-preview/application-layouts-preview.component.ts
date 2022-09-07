import { CardComponent, IconComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CardComponent, IconComponent],
  templateUrl: './application-layouts-preview.component.html',
  styleUrls: ['./application-layouts-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationLayoutsPreviewComponent {
  public constructor(public router: Router) {}

  public openLayoutExample(example: string) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/examples/layouts/${example}`]));
    window.open(url, '_blank');
  }
}
