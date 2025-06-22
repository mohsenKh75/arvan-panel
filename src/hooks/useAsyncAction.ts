import { DependencyList, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { GetState } from '@/store/hooks';
import { isServerSide } from '@/utils/helpers';
import { AppDispatch } from '@/store/store';

type ActionType = (data?: any) => (dispatch: Dispatch, getState?: GetState) => Promise<any>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type ArgumentType<F extends Function> = F extends (...args: infer A) => any ? A[0] : never;
interface UseAsyncAction<T, M extends ActionType> {
  action: (actionData?: ArgumentType<M>) => (dispatch: Dispatch, getState: GetState) => Promise<T>;
  fireOnLoad?: boolean;
  actionDataOnLoad?: ArgumentType<M>;
  successCallback?: (data: T) => void;
  failedCallback?: (error: Error) => void;
  dependenciesOnLoad?: DependencyList;
}

interface UseAsyncActionReturnType<T, M extends ActionType> {
  pending: boolean;
  request: (actionData?: ArgumentType<M>) => Promise<T>;
}

function useAsyncAction<T, M extends ActionType>({
  action,
  fireOnLoad,
  actionDataOnLoad,
  successCallback,
  failedCallback,
  dependenciesOnLoad
}: UseAsyncAction<T, M>): UseAsyncActionReturnType<T, M> {
  const [pending, setPending] = useState(!!fireOnLoad);
  const dispatch = useDispatch<AppDispatch>();
  const isReady = !isServerSide;

  function request(actionData?: ArgumentType<M>) {
    setPending(true);
    return dispatch(action(actionData))
      ?.then((response: T) => {
        setPending(false);
        successCallback?.(response);
        return response;
      })
      ?.catch((error: Error) => {
        setPending(false);
        failedCallback?.(error);
        return Promise.reject(error);
      });
  }

  const memoizedDependenciesOnLoad = useMemo(
    () => (!dependenciesOnLoad ? [isReady] : [isReady, ...(dependenciesOnLoad || [])]),
    [isReady, dependenciesOnLoad]
  );
  useEffect(() => {
    if (fireOnLoad && isReady) request(actionDataOnLoad);
  }, memoizedDependenciesOnLoad);
  return {
    pending,
    request
  };
}

export { useAsyncAction };
