import { DependencyList, useEffect, useState } from "react";
import { Observable } from "rxjs";

export default function useObservable<T>(
  observable: () => Observable<T>,
  deps: DependencyList = [],
  initialState?: T
): { data: T | undefined; loading: boolean } {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const subscription = observable().subscribe(setState);

    return () => {
      subscription.unsubscribe();
      setState(initialState);
    };
  }, deps); // eslint-disable-line

  return {
    data: state,
    loading: state === undefined,
  };
}
