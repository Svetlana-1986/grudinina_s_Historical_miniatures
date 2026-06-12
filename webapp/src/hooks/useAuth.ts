import { trpc } from '../lib/trpc';

export const useAuth = () => {
  const me = trpc.me.useQuery();

  return {
    user: me.data,
    isLoading: me.isLoading,
    isAuthorized: !!me.data,
  };
};
