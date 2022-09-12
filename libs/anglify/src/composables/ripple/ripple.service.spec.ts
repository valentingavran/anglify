import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockElementRef } from '../../mocks/element-ref.mock';
import { Renderer2Mock } from '../../mocks/renderer2.mock';
import { RippleService } from './ripple.service';

describe('RippleService', () => {
  let service: RippleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RippleService,
        {
          provide: ElementRef,
          useClass: MockElementRef,
        },
        {
          provide: Renderer2,
          useClass: Renderer2Mock,
        },
      ],
    });
    service = TestBed.inject(RippleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create state container with css class', () => {
    const elementRef = TestBed.inject(ElementRef);
    const nativeElement = elementRef.nativeElement as HTMLElement;
    // @ts-expect-error: Test case
    const container = service.createStateContainer();

    expect(container.classList.value).toBe('anglify-state-container');
    expect(nativeElement.contains(container)).toBeTruthy();
  });

  it('should add transition and destroy ripple after 500ms', done => {
    // create mock ripple container
    const container = document.createElement('div');
    // @ts-expect-error: Test case
    service.stateContainer.append(container);
    // @ts-expect-error: Test case
    service.visibleRipples.push(container);

    // @ts-expect-error: Test case
    expect(service.visibleRipples.length).toBe(1);
    // @ts-expect-error: Test case
    service.destroyLastRipple();
    expect(container.style.opacity === '0').toBeTruthy();
    expect(container.style.transitionDuration === '500ms').toBeTruthy();
    // @ts-expect-error: Test case
    expect(service.stateContainer.contains(container)).toBeTruthy();
    // eslint-disable-next-line no-restricted-globals
    setTimeout(() => {
      // @ts-expect-error: Test case
      expect(service.stateContainer.contains(container)).toBeFalsy();
      done();
    }, 1_000);
  });
});
