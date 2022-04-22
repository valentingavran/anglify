import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent, merge } from 'rxjs';
import { DialogContext } from './dialog-context.interface';
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
  @ViewChild('backdrop', { static: true })
  private readonly backdrop!: ElementRef<HTMLDivElement>;

  @ViewChild('dialog', { static: true })
  private readonly dialogElement!: ElementRef<HTMLElement>;

  public constructor(
    @Inject(DOCUMENT)
    private readonly document: Document,
    elementRef: ElementRef<HTMLElement>,
    @Inject(DIALOG_CONTEXT)
    private readonly context: DialogContext,
    @Inject(DIALOG_NODES)
    private readonly nodes: HTMLElement[]
  ) {
    this.nodes.forEach(node => elementRef.nativeElement.appendChild(node));
  }

  public ngOnInit() {
    const backdropClick$ = fromEvent<MouseEvent>(this.backdrop.nativeElement, 'click', { capture: true }).pipe(
      filter(({ target }) => !this.dialogElement.nativeElement.contains(target as HTMLElement))
    );
    const escapeKey$ = fromEvent<KeyboardEvent>(this.document.body, 'keyup').pipe(filter(({ key }) => key === 'Escape'));

    merge(escapeKey$, backdropClick$)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.context.completeWith());

    this.nodes.forEach(node => this.dialogElement.nativeElement.appendChild(node));
  }
}
