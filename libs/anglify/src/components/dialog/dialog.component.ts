import { DOCUMENT } from '@angular/common';
import type { AfterViewInit } from '@angular/core';
import { HostBinding, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild, type OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent } from 'rxjs';
import { TrapFocusDirective } from '../../directives/trap-focus/trap-focus.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { DEFAULT_DIALOG_SETTINGS, DIALOG_SETTINGS } from './dialog-settings.token';
import type { EntireDialogSettings } from './dialog.interface';
import { DialogContext, DialogInternalCloseReason } from './dialog.interface';
import { DIALOG_CONTEXT, DIALOG_NODES } from './dialog.service';

@UntilDestroy()
@Component({
  selector: 'anglify-dialog',
  standalone: true,
  imports: [TrapFocusDirective],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireDialogSettings>('anglifyDialogSettings', DEFAULT_DIALOG_SETTINGS, DIALOG_SETTINGS)],
})
export class DialogComponent implements OnInit, AfterViewInit {
  @ViewChild('dialog', { static: true }) private readonly dialogElement?: ElementRef<HTMLElement>;

  public constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(DIALOG_CONTEXT) private readonly context: DialogContext,
    @Inject(DIALOG_NODES) private readonly nodes: HTMLElement[],
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    this.context.overlayRef.backdrop = true;
  }

  @HostBinding('attr.tabindex')
  protected tabIndex = 0;

  public ngOnInit() {
    fromEvent<KeyboardEvent>(this.document.body, 'keyup')
      .pipe(filter(({ key }) => key === 'Escape'))
      .pipe(untilDestroyed(this))
      .subscribe(() => this.context.completeWith({ reason: DialogInternalCloseReason.Escape }));

    this.context.overlayRef.backdropClick$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.context.completeWith({ reason: DialogInternalCloseReason.Backdrop }));

    this.dialogElement?.nativeElement.append(...this.nodes);
  }

  public ngAfterViewInit() {
    const elements = TrapFocusDirective.getAllFocusableElements(this.elementRef.nativeElement);
    if (elements.length > 0) elements[0].focus();
    else this.elementRef.nativeElement.focus();
  }
}
