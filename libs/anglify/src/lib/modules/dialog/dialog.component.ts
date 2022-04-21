import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, ElementRef, ViewChild, OnInit } from '@angular/core';
import { filter, fromEvent, merge, takeUntil } from 'rxjs';
import { DialogContext } from './dialog-context.interface';
import { DIALOG_CONTEXT, DIALOG_NODES } from './dialog.service';
import { AnglifyDestroyService } from '../../services/destroy/destroy.service';

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
    private readonly nodes: HTMLElement[],
    private readonly destroy$: AnglifyDestroyService
  ) {
    this.nodes.forEach(node => elementRef.nativeElement.appendChild(node));
  }

  public ngOnInit() {
    const backdropClick$ = fromEvent<MouseEvent>(this.backdrop.nativeElement, 'click', { capture: true }).pipe(
      filter(({ target }) => !this.dialogElement.nativeElement.contains(target as HTMLElement))
    );
    const escapeKey$ = fromEvent<KeyboardEvent>(this.document.body, 'keyup').pipe(filter(({ key }) => key === 'Escape'));

    merge(escapeKey$, backdropClick$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.context.completeWith());

    this.nodes.forEach(node => this.dialogElement.nativeElement.appendChild(node));
  }
}
