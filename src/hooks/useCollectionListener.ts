import { DependencyList } from "react";
import { Observable } from "rxjs";
import useObservable from "./useObservable";

export function useCollectionListener<T>(
  observable: () => Observable<T[]>,
  deps: DependencyList = []
) {
  const { data, loading } = useObservable(observable, deps, []);

  return {
    data: data || [],
    loading,
  };
}
