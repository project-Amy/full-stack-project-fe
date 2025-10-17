import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const time = {
  seconds: 1000,
  minutes: 60 * 1000,
  hours: 60 * 60 * 1000,
};

export type ConfigType = {
  staleTime: number;
  gcTime: number;
  refetchInterval?: number;
  refetchOnMount?: boolean | "always";
  enabled?: boolean;
  retry?: number;
};

type QueryConfig = {
  daily: ConfigType;
  rare: ConfigType;
  frequent: ConfigType;
  autoFetchFrequent: ConfigType;
  noCache: ConfigType;
};

export const queryConfig: QueryConfig = {
  daily: {
    staleTime: 8 * time.hours,
    gcTime: 8 * time.hours,
  },
  rare: {
    staleTime: 24 * time.hours,
    gcTime: 48 * time.hours,
  },
  frequent: {
    staleTime: 5 * time.minutes,
    gcTime: 10 * time.minutes,
  },
  autoFetchFrequent: {
    staleTime: 3 * time.minutes,
    gcTime: 5 * time.minutes,
    refetchInterval: 2 * time.minutes,
  },
  noCache: {
    staleTime: 0,
    gcTime: 0,
  },
};
/**
 * @param queryKey - La chiave della query.
 * @param queryFn - La funzione di query.
 */

export function useCommonQuery<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryKey: any[],
  config: ConfigType,
  queryFn: () => Promise<T>
) {
  return useQuery({
    queryKey: queryKey,
    ...config,
    queryFn: queryFn,
  });
}

/**
 * @param mutationFn - La funzione di mutazione.
 * @param queryKey - La chiave della query.
 */
export function useCommonMutation<T>(
  mutationFn: (data: T) => Promise<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryKey?: any[],
  onSuccess?: () => void
) {
  return useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      invalidateQuery(queryKey ?? []);
      onSuccess?.();
    },
  });
}

/**
 * @param mutationFn - La funzione di mutazione che ritorna void.
 * @param queryKey - La chiave della query.
 */
export function useCommonVoidMutation<T>(
  mutationFn: (data: T) => Promise<void>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryKey?: any[],
  onSuccess?: () => void
) {
  return useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      invalidateQuery(queryKey ?? []);
      onSuccess?.();
    },
  });
}

/**
 * @param mutationFn - La funzione di mutazione con tipi di input e output diversi.
 * @param queryKey - La chiave della query.
 */
export function useFlexibleMutation<TInput, TOutput>(
  mutationFn: (data: TInput) => Promise<TOutput>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryKey?: any[],
  onSuccess?: () => void
) {
  return useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      invalidateQuery(queryKey ?? []);
      onSuccess?.();
    },
  });
}

/**
 * Funzioni per invalidare e refetchare le query,
 * lavorano con query key esplicitamente passate.
 * @param queryKey - La chiave della query.
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function invalidateQuery(queryKey: any[]) {
  queryClient.invalidateQueries({ queryKey: queryKey });
}

/**
 * Refetcha la query.
 * @param queryKey - La chiave della query.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function refetchQuery(queryKey: any[]) {
  queryClient.refetchQueries({ queryKey: queryKey });
}

export { useMutation, useQuery };
