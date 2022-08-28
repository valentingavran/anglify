import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentUnit',
  standalone: true,
})
export class PercentPipe implements PipeTransform {
  public transform(value: string | number) {
    return `${value}%`;
  }
}
