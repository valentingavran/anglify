import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-show-hide-manually',
  templateUrl: './show-hide-manually.component.html',
  styleUrls: ['./show-hide-manually.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowHideManuallyComponent {}

export default ShowHideManuallyComponent;
