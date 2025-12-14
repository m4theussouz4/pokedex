import { Subscription, Unsubscribable } from 'rxjs';
import 'reflect-metadata';

export function Unsubscribe() {
  return function (component) {
    const defaultSubscriberName = 'subscriber'; // name of the parameter that should be used in the component
    let subscriptions: Unsubscribable[] = []; // subscription array

    // create subscriber property
    Object.defineProperty(
      component.prototype,
      defaultSubscriberName,
      {
        get: () => subscriptions,
        set: subscription => { subscriptions.push(subscription) },
      }
    );

    // get original ngOnDestroy function if exists in the component
    const originalDestroyFunction = component.prototype['ngOnDestroy'];
    
    // create ngOnDestroy function and call unsubscribe() inside it
    component.prototype['ngOnDestroy'] = function () {
      unsubscribe();

      // call original ngOnDestroy function if exists
      if (originalDestroyFunction) originalDestroyFunction.apply(this);
    };

    // do unsubscribe and reset subscription array
    function unsubscribe() {
      subscriptions.forEach(sub => {
        if(sub instanceof Subscription) sub.unsubscribe()
      })
      subscriptions = [];
    }

    return component;
  };
}