import { ChipComponent, IconComponent, SlotDirective } from '@anglify/components';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-references',
  standalone: true,
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChipComponent, IconComponent, SlotDirective, NgIf],
})
export class ReferencesComponent {
  @Input() public bundleSize?: string;
  @Input() public issues?: string;
  @Input() public materialDesign?: string;
  @Input() public w3c?: string;

  public open(url: string | undefined) {
    window.open(url, '_blank');
  }
}
