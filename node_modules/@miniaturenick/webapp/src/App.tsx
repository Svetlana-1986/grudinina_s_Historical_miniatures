import { TrpcProvider } from './lib/trpc';
import { AllCardsPage } from './pages/AllCardsPage';

export const App = () => {
  return (
    <TrpcProvider>
      <AllCardsPage />
    </TrpcProvider>
  );
};
