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
  cardNick: true,
});
export type ViewCardPageRouteParams = typeof viewCardPageRouteParams;
export const getViewCardPageRoute = ({ cardNick }: ViewCardPageRouteParams) =>
  `/cards/${cardNick}`;

export const getNewCardPageRoute = () => 'cards/new';

export const getForumPage = () => 'cards/forum';

// export const viewCardPageRouteParams = { cardNick: ':cardNick' };
// export type ViewCardPageRouteParams = { cardNick: string };
// export const getViewCardPageRoute = ({ cardNick }: { cardNick: string }) =>
//   `/cards/${cardNick}`;
