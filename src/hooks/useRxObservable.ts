import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export function useRxObservable<T>(observable$: Observable<T>) {
  const [data, setData] = useState<T | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = observable$.subscribe((value) => {
      setData(value);
      setLoading(false);
    });

    return () => sub.unsubscribe();
  }, [observable$]);

  return { data, loading };
}
