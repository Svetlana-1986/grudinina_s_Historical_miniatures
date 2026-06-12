import { trpc } from '../../lib/trpc';

type Props = {
  className?: string;
};

export const SignOutButton = ({ className }: Props) => {
  const utils = trpc.useUtils();

  const signOut = trpc.signOut.useMutation({
    onSuccess: async () => {
      await utils.me.invalidate();

      window.location.href = '/';
    },
  });

  return (
    <button
      className={className}
      type="button"
      onClick={() => {
        signOut.mutate();
      }}
    >
      Выйти
    </button>
  );
};
