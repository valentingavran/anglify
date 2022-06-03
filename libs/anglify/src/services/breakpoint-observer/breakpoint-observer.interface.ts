import { InjectionToken } from '@angular/core';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BreakpointSettings = { [key in Breakpoint]: number };

export const BREAKPOINT_SETTINGS = new InjectionToken<Partial<BreakpointSettings>>('Breakpoint Config');
