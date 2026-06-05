import type { TrpcRouter } from '@miniaturenick/backend/router';

import { createTRPCReact } from '@trpc/react-query';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { httpBatchLink } from '@trpc/client';

import superjson from 'superjson';

export const trpc = createTRPCReact<TrpcRouter>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,

      transformer: superjson,

      fetch(url, options) {
        return fetch(url, {
          ...options,

          credentials: 'include',
        });
      },
    }),
  ],
});

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
