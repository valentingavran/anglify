import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnglifyIdService {
  private static autoId = 0;

  public generate() {
    return `anglify_${AnglifyIdService.autoId++}${Date.now()}`;
  }
}
