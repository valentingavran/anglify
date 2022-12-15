import { ElementRef, Injectable } from '@angular/core';
import type { Elevation } from './elevation.interface';

@Injectable({ providedIn: 'root' })
export class ElevationService {
  private currentElevation: Elevation = 0;

  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  public get elevation() {
    return this.currentElevation;
  }

  public set elevation(elevation: Elevation) {
    this.elementRef.nativeElement.classList.remove(`anglify-elevation-${this.currentElevation}`);
    this.elementRef.nativeElement.classList.add(`anglify-elevation-${elevation}`);
    this.currentElevation = elevation;
  }
}
