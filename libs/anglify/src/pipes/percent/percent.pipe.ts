import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentUnit',
  standalone: true,
})
export class PercentPipe implements PipeTransform {
  public transform(value: number | string) {
    return `${value}%`;
  }
}
