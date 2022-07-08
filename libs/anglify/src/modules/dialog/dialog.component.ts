import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent } from 'rxjs';
import { DialogContext, ModalInteralCloseReason } from './dialog.interface';
import { DIALOG_CONTEXT, DIALOG_NODES } from './dialog.service';

@UntilDestroy()
@Component({
  selector: 'anglify-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent implements OnInit {
  @ViewChild('dialog', { static: true })
  private readonly dialogElement!: ElementRef<HTMLElement>;

  public constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(DIALOG_CONTEXT) private readonly context: DialogContext,
    @Inject(DIALOG_NODES) private readonly nodes: HTMLElement[]
  ) {}

  public ngOnInit() {
    fromEvent<KeyboardEvent>(this.document.body, 'keyup')
      .pipe(filter(({ key }) => key === 'Escape'))
      .pipe(untilDestroyed(this))
      .subscribe(() => this.context.completeWith({ reason: ModalInteralCloseReason.Escape }));

    this.dialogElement.nativeElement.append(...this.nodes);
  }
}
