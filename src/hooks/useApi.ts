import { useCallback, useState } from 'react';

interface UseApiParams<Response, Body> {
  apiMethod: (payload?: Body) => Promise<Response>;
}

export function useApi<Response, Body = any>({ apiMethod }: UseApiParams<Response, Body>) {
  const [pending, setPending] = useState(false);
  const [data, setData] = useState<Response>();
  const [error, setError] = useState<Error | null>(null);

  const request = useCallback(
    async (payload?: Body) => {
      setPending(true);
      setError(null);
      try {
        const res = await apiMethod(payload);
        setData(res);
        return res;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setPending(false);
      }
    },
    [apiMethod]
  );

  return { request, data: data, pending, error };
}
