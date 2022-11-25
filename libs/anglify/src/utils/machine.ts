import { BehaviorSubject } from 'rxjs';

export type State<S extends string, A extends string, C> = {
  do: {
    [key in A | 'beforeEach']?: (context: C, action: A, payload: any, previousState: S) => void;
  };
  on: {
    [key in A]?: S | ((context: C) => S);
  };
};

export type MachineConfig<S extends string, A extends string, C> = {
  context: C;
  initial: S;
  states: {
    [K in S]?: State<S, A, C>;
  };
};

export class Machine<S extends string, A extends string, C> {
  public readonly currentState$ = new BehaviorSubject(this.config.initial);

  public readonly context$ = new BehaviorSubject({ ...this.config.context });

  public constructor(public readonly config: MachineConfig<S, A, C>) {}

  public next(action: A, payload?: any) {
    const currentStateObject = this.config.states[this.currentState$.value];
    if (!currentStateObject) return;
    const nextState = this.getNextStateName(currentStateObject, action);
    if (!nextState) return;
    const nextStateObject = this.config.states[nextState];
    if (!nextStateObject) return;
    const beforeEach = nextStateObject.do.beforeEach;
    if (beforeEach) {
      const context = { ...this.context$.value };
      beforeEach(context, action, payload, this.currentState$.value);
      this.context$.next(context);
    }

    const effect = nextStateObject.do[action];
    if (effect) {
      const context = { ...this.context$.value };
      effect(context, action, payload, this.currentState$.value);
      this.context$.next(context);
    }

    this.currentState$.next(nextState);
  }

  private getNextStateName(currentStateObject: State<S, A, C>, action: A): S | undefined {
    const nextState = currentStateObject.on[action] as S | ((context: C) => S);
    if (!nextState) return;
    return typeof nextState === 'function' ? nextState(this.context$.value) : nextState;
  }
}
