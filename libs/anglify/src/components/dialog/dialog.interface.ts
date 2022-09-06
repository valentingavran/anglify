import { TemplateRef, Type } from '@angular/core';
import { Subscriber } from 'rxjs';

export interface DialogOptions<T = Record<string, unknown>> {
  id: string;
  data?: T;
}

export enum DialogInternalCloseReason {
  Escape = 'internal.escape',
  Backdrop = 'internal.backdrop',
}

export interface ModalData<T = unknown> {
  reason: DialogInternalCloseReason | string;
  data?: T;
}

export interface DialogContext<T = Record<string, unknown>> extends DialogOptions<T> {
  completeWith: (data: ModalData) => void;
  $implicit: Subscriber<unknown>;
  component: Type<any> | TemplateRef<any>;
  createdAt: number;
}
