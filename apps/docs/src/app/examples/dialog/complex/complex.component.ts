import type { ModalData } from '@anglify/components';
import { DialogContext, DIALOG_CONTEXT, ButtonComponent, DialogService } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { map } from 'rxjs';

@Component({
  standalone: true,
  template: `<div style="display: flex; flex-direction: column;">
    <p>{{ dialogContext.data!.title }}</p>
    <p>{{ dialogContext.data!.message }}</p>
    <button style="align-self:flex-end;" type="button" anglifyButton appearance="text" (click)="closeDialog()">Close</button>
  </div>`,
  styles: [
    `
      :host {
        display: block;
        padding: 16px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
})
export class DialogTestComponent {
  public constructor(@Optional() @Inject(DIALOG_CONTEXT) protected readonly dialogContext: DialogContext) {}

  protected closeDialog() {
    this.dialogContext.completeWith({ reason: 'We closed the dialog', data: 'Hurray, we returned some data!' });
  }
}

@Component({
  selector: 'anglify-complex',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './complex.component.html',
  styleUrls: ['./complex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ComplexComponent {
  public constructor(protected dialogService: DialogService) {}

  protected dialogData = {
    title: 'My Dialog Title',
    message: 'I passed some data to the dialog!',
  };

  protected returnData$!: any;

  public openDialog() {
    this.returnData$ = this.dialogService
      .open$(DialogTestComponent, { data: { ...this.dialogData } })
      .pipe(map(returnData => (returnData as ModalData).data as unknown as string));
  }
}
