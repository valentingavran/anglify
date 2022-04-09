import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentUnit',
})
export class PercentPipe implements PipeTransform {
  transform(value: number): unknown {
    return `${value}%`;
  }
}
