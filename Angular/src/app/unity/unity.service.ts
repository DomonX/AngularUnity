import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { map, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnityService {
  public sub: Subscription = new Subscription();

  public static REGISTRY: Record<
    string,
    { subject: Subject<any>; action: new (any) => any }
  > = {};

  constructor(private store: Store, private actions$: Actions) {
    Object.keys(UnityService.REGISTRY).forEach((i) => {
      const sub = UnityService.REGISTRY[i].subject.subscribe((j) => {
        console.info(j);
        this.store.dispatch(new UnityService.REGISTRY[i].action(j));
      });
      this.sub.add(sub);
    });

    this.actions$.pipe(ofActionDispatched());
  }
}
