import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferencesComponent {
  @Input() public bundleSize?: string;
  @Input() public issues?: string;
  @Input() public materialDesign?: string;
  @Input() public w3c?: string;

  public open(url: string) {
    window.open(url, '_blank');
  }
}
