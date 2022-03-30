import { Inject } from '@angular/core';
import { Action, Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { UnityService } from './unity.service';

export interface UnityWindow {
  unity: Record<string, Function>;
}

// @ts-ignore
export const isWindowUnity = <T extends Window>(w: T): w is UnityWindow => {
  return 'unity' in w;
};

export function UnityAction(key: string) {
  return function (constructor: new (value: any) => any) {
    if (!isWindowUnity(window)) {
      Object.assign(window, { unity: {} });
    }
    if (!isWindowUnity(window)) {
      return;
    }
    const subject = new Subject<any>();

    window.unity[key] = (value) => {
      subject.next(value);
    };

    UnityService.REGISTRY[key] = { subject, action: constructor };
  };
}

@UnityAction('myMessage')
export class TestAction {
  static readonly type = '[State] Action';
  constructor(public payload: string) {}
}
