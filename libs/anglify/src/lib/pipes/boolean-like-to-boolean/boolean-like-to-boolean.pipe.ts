import { Pipe, PipeTransform } from '@angular/core';
import { isBooleanLikeTrue } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';

@Pipe({
  name: 'booleanLikeToBoolean',
})
export class BooleanLikeToBooleanPipe implements PipeTransform {
  transform(value: BooleanLike): boolean {
    return isBooleanLikeTrue(value);
  }
}
