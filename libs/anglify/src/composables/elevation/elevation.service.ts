import { ElementRef, Injectable } from '@angular/core';
import type { Elevation } from './elevation.interface';

@Injectable({ providedIn: 'root' })
export class ElevationService {
  private currentElevation: Elevation = 0;

  public constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

  public get elevation() {
    return this.currentElevation;
  }

  public set elevation(elevation: Elevation) {
    this._elementRef.nativeElement.classList.remove(`anglify-elevation-${this.currentElevation}`);
    this._elementRef.nativeElement.classList.add(`anglify-elevation-${elevation}`);
    this.currentElevation = elevation;
  }
}
