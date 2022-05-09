import { Pipe, PipeTransform } from '@angular/core';
import { toBoolean } from '../../../../utils/functions';
import { BooleanLike } from '../../../../utils/interfaces';

@Pipe({
  name: 'booleanLikeToBoolean',
})
export class BooleanLikeToBooleanPipe implements PipeTransform {
  public transform(value: BooleanLike) {
    return toBoolean(value);
  }
}
