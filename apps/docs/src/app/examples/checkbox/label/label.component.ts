import { CheckboxComponent, ClickStopPropagationDirective } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, CheckboxComponent, ClickStopPropagationDirective, RouterModule],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LabelComponent {}
