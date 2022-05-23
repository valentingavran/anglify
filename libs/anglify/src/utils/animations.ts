import { animate, group, query, state, style, transition, trigger } from '@angular/animations';

export const rotate = ({ name = 'rotate', degree = '180deg', duration = '200ms' } = {}) =>
  trigger(name, [
    state('false', style({ transform: 'rotate(0)' })),
    state('true', style({ transform: `rotate(${degree})` })),
    transition('1 => 0', animate(`${duration} cubic-bezier(0.25, 0.8, 0.25, 1)`)),
    transition('0 => 1', animate(`${duration} cubic-bezier(0.25, 0.8, 0.25, 1)`)),
  ]);

export const fastInFastOutY = ({ name = 'fast-in-fast-out-y', duration = '300ms' } = {}) =>
  trigger(name, [
    state('*', style({ 'overflow-y': 'hidden' })),
    state('void', style({ 'overflow-y': 'hidden' })),
    transition('* => void', [style({ height: '*' }), animate(`${duration} cubic-bezier(0.25, 0.8, 0.25, 1)`, style({ height: 0 }))]),
    transition('void => *', [style({ height: '0' }), animate(`${duration} cubic-bezier(0.25, 0.8, 0.25, 1)`, style({ height: '*' }))]),
  ]);

export const slide = ({ name = 'slide', duration = '300ms' } = {}) =>
  trigger(name, [
    transition(':increment', [
      group([
        query(':enter', [style({ transform: 'translateX(100%)' }), animate(duration, style({ transform: 'translateX(0%)' }))], {
          optional: true,
        }),
        query(':leave', [style({ transform: 'translateX(0%)' }), animate(duration, style({ transform: 'translateX(-100%)' }))], {
          optional: true,
        }),
      ]),
    ]),
    transition(':decrement', [
      group([
        query(':enter', [style({ transform: 'translateX(-100%)' }), animate(duration, style({ transform: 'translateX(0%)' }))], {
          optional: true,
        }),
        query(':leave', [style({ transform: 'translateX(0%)' }), animate(duration, style({ transform: 'translateX(100%)' }))], {
          optional: true,
        }),
      ]),
    ]),
  ]);
