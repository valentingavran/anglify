import { FormFieldModule, IconModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CounterComponent } from './counter/counter.component';
import { DenseComponent } from './dense/dense.component';
import { DisabledValidationComponent } from './disabled-validation/disabled-validation.component';
import DisabledComponent from './disabled/disabled.component';
import HintComponent from './hint/hint.component';
import { IconsComponent } from './icons/icons.component';
import { LabelSlotComponent } from './label-slot/label-slot.component';
import LongHintAndLongLabelComponent from './long-hint-and-long-label/long-hint-and-long-label.component';
import { ManualErrorComponent } from './manual-error/manual-error.component';
import { NativeInputValidationComponent } from './native-input-validation/native-input-validation.component';
import PersistentPlaceholderComponent from './persistent-placeholder/persistent-placeholder.component';
import PlaceholderComponent from './placeholder/placeholder.component';
import { PrefixAndSuffixComponent } from './prefix-and-suffix/prefix-and-suffix.component';
import { ReactiveFormsValidationComponent } from './reactive-forms-validation/reactive-forms-validation.component';
import { ReadonlyComponent } from './readonly/readonly.component';
import { ServerErrorHandlingComponent } from './server-error-handling/server-error-handling.component';
import { TextareaComponent } from './textarea/textarea.component';
import WithoutLabelComponent from './without-label/without-label.component';

@NgModule({
  imports: [CommonModule, FormFieldModule, ReactiveFormsModule, IconModule],
  declarations: [
    DisabledComponent,
    PlaceholderComponent,
    WithoutLabelComponent,
    PersistentPlaceholderComponent,
    HintComponent,
    LongHintAndLongLabelComponent,
    ReadonlyComponent,
    IconsComponent,
    CounterComponent,
    ManualErrorComponent,
    ReactiveFormsValidationComponent,
    ServerErrorHandlingComponent,
    NativeInputValidationComponent,
    PrefixAndSuffixComponent,
    LabelSlotComponent,
    DenseComponent,
    TextareaComponent,
    DisabledValidationComponent,
  ],
})
export class FormFieldExamplesModule {}
