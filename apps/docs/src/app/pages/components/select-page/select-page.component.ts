import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'app-select-page',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent {
  public config: APIConfig = {
    components: ['SelectComponent'],
  };

  public appearance: 'filled' | 'outlined' = 'filled';
  public label = 'Label';
  public placeholder = 'Placeholder';
  public hint = 'Hint';
  public readonly = false;
  public disabled = false;
  public clearable = false;
  public multiple = false;
  public closeOnSelect = true;
  public alwaysFloatingLabel = false;
  public persistentHint = false;
  public hideDetails = false;

  public readonly items = [
    'test',
    'test 1',
    'test 2',
    'test 3',
    'test 4',
    'test 5',
    'test 6',
    'test 7',
    'test 8',
    'test 9',
    'test 10',
    'test 11',
    'test 12',
    'test 13',
    'test 14',
    'test 15',
    'test 16',
    'test 17',
    'test 18',
    'test 19',
    'test 20',
  ];
}
