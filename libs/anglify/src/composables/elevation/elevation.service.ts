import { ElementRef, Injectable } from '@angular/core';
import type { Elevation } from './elevation.interface';

@Injectable()
export class ElevationService {
  private currentElevation: Elevation = 0;

  public constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

  public set elevation(elevation: Elevation) {
    this._elementRef.nativeElement.classList.remove(`anglify-elevation-${this.currentElevation}`);
    this._elementRef.nativeElement.classList.add(`anglify-elevation-${elevation}`);
    this.currentElevation = elevation;
  }

  public get elevation() {
    return this.currentElevation;
  }
}
