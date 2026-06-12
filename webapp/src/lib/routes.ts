// Generic функция
const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce(
    (acc, key) => ({ ...acc, [key]: `:${key}` }),
    {},
  ) as Record<keyof T, string>;
};

export const getMainCardPageRoute = () => '/';
export const getAllCardsPageRoute = () => '/allcards';

export const viewCardPageRouteParams = getRouteParams({
  cardSlug: true,
});
export type ViewCardPageRouteParams = typeof viewCardPageRouteParams;
export const getViewCardPageRoute = ({ cardSlug }: ViewCardPageRouteParams) =>
  `/cards/${cardSlug}`;

export const getNewCardPageRoute = () => 'cards/new';

export const getBlogRoutePage = () => '/blog';

export const getSignUpRoutePage = () => '/sign-up';

export const getSignInRoutePage = () => '/sign-in';

export const getProfileRoutePage = () => '/profile';
