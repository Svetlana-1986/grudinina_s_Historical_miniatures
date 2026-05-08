import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TrpcProvider } from './lib/trpc';
import { MainCardPage } from './pages/MainCardPage';
import { AllCardsPage } from './pages/AllCardsPage';
import { ViewCardPage } from './pages/ViewCardPage';
import {
  getMainCardPageRoute,
  getAllCardsPageRoute,
  getViewCardPageRoute,
  viewCardPageRouteParams,
} from './lib/routes';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getMainCardPageRoute()} element={<MainCardPage />} />
          <Route path={getAllCardsPageRoute()} element={<AllCardsPage />} />
          <Route
            path={getViewCardPageRoute(viewCardPageRouteParams)}
            element={<ViewCardPage />}
          />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
