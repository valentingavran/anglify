import { Pipe, PipeTransform } from '@angular/core';
import { clamp } from '../../../../utils/functions';

@Pipe({
  name: 'clamp',
  standalone: true,
})
export class ClampPipe implements PipeTransform {
  public transform(value: number, min = 0, max = 100) {
    return clamp(value, min, max);
  }
}
