import { ButtonComponent, IconComponent, SlotDirective, TabComponent, TabGroupComponent, ToolbarComponent } from '@anglify/components';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './extended-prominent.component.html',
  styleUrls: ['./extended-prominent.component.scss'],
  imports: [ToolbarComponent, ButtonComponent, IconComponent, TabGroupComponent, TabComponent, SlotDirective],
})
export default class ExtendedProminentComponent {}
