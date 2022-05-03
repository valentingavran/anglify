import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './multiple-mandatory.component.html',
  styleUrls: ['./multiple-mandatory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleMandatoryComponent {}

export default MultipleMandatoryComponent;
