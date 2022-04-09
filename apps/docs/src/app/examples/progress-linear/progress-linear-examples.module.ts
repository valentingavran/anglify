import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndeterminateComponent } from './indeterminate/indeterminate.component';
import { ProgressLinearModule } from '@anglify/components';
import { BufferComponent } from './buffer/buffer.component';
import { RegularComponent } from './regular/regular.component';
import { StreamComponent } from './stream/stream.component';

@NgModule({
  declarations: [IndeterminateComponent, BufferComponent, RegularComponent, StreamComponent],
  imports: [CommonModule, ProgressLinearModule],
})
export class ProgressLinearExamplesModule {}
