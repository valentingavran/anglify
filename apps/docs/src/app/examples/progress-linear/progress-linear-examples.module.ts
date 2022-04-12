import { ProgressLinearModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BufferComponent } from './buffer/buffer.component';
import { IndeterminateComponent } from './indeterminate/indeterminate.component';
import { RegularComponent } from './regular/regular.component';
import { StreamComponent } from './stream/stream.component';

@NgModule({
  declarations: [IndeterminateComponent, BufferComponent, RegularComponent, StreamComponent],
  imports: [CommonModule, ProgressLinearModule],
})
export class ProgressLinearExamplesModule {}
