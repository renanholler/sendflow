import { DependencyList, useEffect, useState } from "react";
import { Observable } from "rxjs";

export default function useObservable<T>(
  observable: () => Observable<T>,
  deps: DependencyList = [],
  initialState?: T
): T | undefined {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const subscription = observable().subscribe(setState);

    return () => {
      subscription.unsubscribe();
      setState(initialState);
    };
  }, deps); // eslint-disable-line

  return state;
}
