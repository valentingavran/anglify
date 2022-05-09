import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentUnit',
})
export class PercentPipe implements PipeTransform {
  public transform(value: string | number) {
    return `${value}%`;
  }
}
