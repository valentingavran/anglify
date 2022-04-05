import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-prefix-and-suffix',
  templateUrl: './prefix-and-suffix.component.html',
  styleUrls: ['./prefix-and-suffix.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefixAndSuffixComponent {}

export default PrefixAndSuffixComponent;
