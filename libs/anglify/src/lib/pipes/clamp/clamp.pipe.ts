import { Pipe, PipeTransform } from '@angular/core';
import { clamp } from '../../utils/functions';

@Pipe({
  name: 'clamp',
})
export class ClampPipe implements PipeTransform {
  transform(value: number, min: number = 0, max: number = 100): number {
    return clamp(value, min, max);
  }
}
