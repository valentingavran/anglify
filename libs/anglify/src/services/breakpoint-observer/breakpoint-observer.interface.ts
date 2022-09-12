import { InjectionToken } from '@angular/core';

export type Breakpoint = 'lg' | 'md' | 'sm' | 'xl' | 'xs';

export type BreakpointSettings = { [key in Breakpoint]: number };

export const BREAKPOINT_SETTINGS = new InjectionToken<Partial<BreakpointSettings>>('Breakpoint Config');
