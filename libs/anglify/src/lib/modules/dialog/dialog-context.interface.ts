import { TemplateRef, Type } from '@angular/core';
import { Subscriber } from 'rxjs';
import { DialogOptions } from './dialog-options.interface';

export interface DialogContext<T = Record<string, unknown>> extends DialogOptions<T> {
  completeWith: (result?: any) => void;
  $implicit: Subscriber<unknown>;
  component: Type<any> | TemplateRef<any>;
  createdAt: number;
}
