import { apiHandler } from "@/utils/apiHandler";
import { useCallback, useState } from "react";

interface UseApiParams {
  ep: string;
}

export function useApi<Response, Body = any>({ ep }: UseApiParams) {
  const [pending, setPending] = useState(false);
  const [data, setData] = useState<Response>();
  const [error, setError] = useState<Error | null>(null);

  const request = useCallback(
    async (options?: {
      method?: "GET" | "POST" | "PUT" | "DELETE";
      payload?: Body;
    }) => {
      setPending(true);
      setError(null);
      try {
        const res = await apiHandler<Response, Body>({
          ep,
          method: options?.method ?? "GET",
          payload: options?.payload ?? null,
        });
        setData(res);
        return res;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setPending(false);
      }
    },
    [ep]
  );

  return { request, data, pending, error };
}
