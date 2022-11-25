import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'selectItemViewer',
  standalone: true,
})
export class SelectItemViewerPipe implements PipeTransform {
  public transform(item: any | string, itemText: string | undefined): string {
    return SelectItemViewerPipe.transform(item, itemText);
  }

  /**
   * If itemText is defined, it will return the value of the itemText property of each item.
   * It's assumed that the items are strings if itemText is undefined.
   */
  public static transform(item: any | string, itemText: string | undefined): string {
    return itemText ? item[itemText] : item;
  }
}
