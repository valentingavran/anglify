import { ButtonComponent, IconComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'copy-button-component',
  standalone: true,
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, IconComponent],
})
export class CopyButtonComponent {
  @Input() public content: string = '';

  public copy() {
    void navigator.clipboard.writeText(this.content);
  }
}
