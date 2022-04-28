import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
  public constructor() {
    super(document.createElement('div'));
  }
}
