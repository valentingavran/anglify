import { Pipe, PipeTransform } from '@angular/core';
import { toBoolean } from 'libs/anglify/src/utils/functions';
import { BooleanLike } from 'libs/anglify/src/utils/interfaces';

@Pipe({
  name: 'booleanLikeToBoolean',
})
export class BooleanLikeToBooleanPipe implements PipeTransform {
  public transform(value: BooleanLike): boolean {
    return toBoolean(value);
  }
}
