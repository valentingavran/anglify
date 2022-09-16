import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { DataTableHeader } from '../data-table.interface';

@Pipe({
  name: 'isColumnVisible',
  standalone: true,
})
export class IsColumnVisiblePipe implements PipeTransform {
  public transform(value: DataTableHeader, isMobile: boolean): boolean {
    if (isMobile) {
      return !value.hiddenOnMobile ?? true;
    }

    return !value.hidden ?? true;
  }
}
