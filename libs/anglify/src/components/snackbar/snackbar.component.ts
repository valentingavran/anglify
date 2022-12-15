import { NgIf } from '@angular/common';
import type { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject, Self, type OnDestroy, type OnInit, ElementRef } from '@angular/core';
import { createSettingsProvider } from '../../factories/settings.factory';
import { ButtonComponent } from '../button/button.component';
import { DEFAULT_SNACKBAR_SETTINGS, SNACKBAR_SETTINGS } from './snackbar-settings.token';
import { EntireSnackbarSettings, SnackbarContext, SnackbarInternalDismissReason } from './snackbar.interface';
import { SNACKBAR_CONTEXT } from './snackbar.service';

@Component({
  selector: 'anglify-snackbar',
  standalone: true,
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireSnackbarSettings>('anglifySnackbarSettings', DEFAULT_SNACKBAR_SETTINGS, SNACKBAR_SETTINGS)],
  imports: [NgIf, ButtonComponent],
})
export class SnackbarComponent implements OnInit, AfterViewInit, OnDestroy {
  private timeout: number | null = null;

  public constructor(
    @Inject(SNACKBAR_CONTEXT) protected readonly context: SnackbarContext,
    @Self() @Inject('anglifySnackbarSettings') private readonly settings: EntireSnackbarSettings,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    this.context.overlayRef.position = this.context.position ?? this.settings.position;
  }

  public ngOnInit() {
    if (this.context.timeout ?? this.settings.timeout) {
      this.timeout = window.setTimeout(() => {
        this.context.completeWith({ reason: SnackbarInternalDismissReason.Timeout });
        this.timeout = null;
      }, this.context.timeout ?? this.settings.timeout);
    }
  }

  public ngAfterViewInit() {
    if (this.context.stacked || (this.context.stacked === undefined && this.settings.stacked)) {
      this.elementRef.nativeElement.classList.add('stacked');
    }
  }

  public ngOnDestroy() {
    if (this.timeout) window.clearTimeout(this.timeout);
  }

  protected dismiss() {
    this.context.completeWith({ reason: this.context.data?.actions?.id ?? SnackbarInternalDismissReason.Dismissed });
  }
}
