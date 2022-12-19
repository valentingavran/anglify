import { ButtonComponent, DialogService } from '@anglify/components';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './from-template.component.html',
  styleUrls: ['./from-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
})
export default class FromTemplateComponent {
  @ViewChild('dialog', { read: TemplateRef }) private readonly dialogTemplate!: TemplateRef<any>;

  public constructor(private readonly dialogService: DialogService) {}

  public openDialog() {
    this.dialogService.open(this.dialogTemplate);
  }
}
