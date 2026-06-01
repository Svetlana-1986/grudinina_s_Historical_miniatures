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

export const getForumRoutePage = () => '/forum';

export const getSighUpRoutePage = () => '/sigh-up';

// export const viewCardPageRouteParams = { cardNick: ':cardNick' };
// export type ViewCardPageRouteParams = { cardNick: string };
// export const getViewCardPageRoute = ({ cardNick }: { cardNick: string }) =>
//   `/cards/${cardNick}`;
