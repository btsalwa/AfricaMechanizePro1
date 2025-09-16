import { QueryClient } from "@tanstack/react-query";
import type { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response): Promise<void> {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string, 
  url: string, 
  data?: unknown
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

interface GetQueryFnOptions {
  on401?: "throw" | "returnNull";
}

export const getQueryFn = ({ on401: unauthorizedBehavior }: GetQueryFnOptions = {}) =>
  async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
    const res = await fetch(queryKey.join("/"), {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes for better performance
      gcTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
      retry: 1, // Retry once for network resilience
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1, // Retry mutations once for better reliability
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});