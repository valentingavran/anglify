import { Injectable } from '@angular/core';

const ANGLIFY = 'anglify_';

@Injectable({
  providedIn: 'root',
})
export class AnglifyIdService {
  private static autoId = 0;

  public generate() {
    return `${ANGLIFY}${AnglifyIdService.autoId++}${Date.now()}`;
  }
}
