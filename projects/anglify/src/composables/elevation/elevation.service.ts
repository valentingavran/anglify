import { ElementRef, Injectable } from '@angular/core';
import { Elevation } from './elevation';

@Injectable()
export class ElevationService {
  private currentElevation: number | null = null;

  public constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

  public set elevation(elevation: Elevation) {
    if (this.currentElevation) {
      this._elementRef.nativeElement.classList.remove(`anglify-elevation-${this.currentElevation}`);
    }
    this._elementRef.nativeElement.classList.add(`anglify-elevation-${elevation}`);
    this.currentElevation = elevation;
  }
}
