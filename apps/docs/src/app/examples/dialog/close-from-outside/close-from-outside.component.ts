import { ButtonComponent, DialogService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  template: `My caller component is responsible for closing me. I'll disappear in 5 seconds.`,
  styles: [
    `
      :host {
        display: block;
        padding: 16px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTestComponent {}

@Component({
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './close-from-outside.component.html',
  styleUrls: ['./close-from-outside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CloseFromOutsideComponent {
  public constructor(protected dialogService: DialogService) {}

  private closeAction$ = new Subject<void>();

  public openDialog() {
    this.dialogService.open$(DialogTestComponent).pipe(takeUntil(this.closeAction$)).subscribe();

    setTimeout(() => {
      this.closeAction$.next();
    }, 5_000);
  }
}
