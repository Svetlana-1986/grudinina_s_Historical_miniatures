export const getMainCardPageRoute = () => '/';
export const getAllCardsPageRoute = () => '/allcards';
export const getViewCardPageRoute = ({ cardNick }: { cardNick: string }) =>
  `/cards/${cardNick}`;
