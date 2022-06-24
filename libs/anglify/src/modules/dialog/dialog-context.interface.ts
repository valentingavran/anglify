import { TemplateRef, Type } from '@angular/core';
import { Subscriber } from 'rxjs';
import { DialogOptions } from './dialog-options.interface';

export interface ModalData {
  reason: string;
  data?: unknown;
}

export interface DialogContext<T = Record<string, unknown>> extends DialogOptions<T> {
  completeWith: (data: ModalData) => void;
  $implicit: Subscriber<unknown>;
  component: Type<any> | TemplateRef<any>;
  createdAt: number;
}
