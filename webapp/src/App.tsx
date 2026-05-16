import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import * as routes from './lib/routes';
// import {
//   getMainCardPageRoute,
//   getAllCardsPageRoute,
//   getViewCardPageRoute,
//   viewCardPageRouteParams,
// } from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { MainCardPage } from './pages/MainCardPage';
import { AllCardsPage } from './pages/AllCardsPage';
import { ViewCardPage } from './pages/ViewCardPage';
import { NewCardPage } from './pages/NewCardPage';
import { ForumPage } from './pages/ForumPage';
import { RegistrationPage } from './pages/RegistrationPage';

import './styles/global.scss';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path={routes.getMainCardPageRoute()}
              element={<MainCardPage />}
            />

            <Route
              path={routes.getAllCardsPageRoute()}
              element={<AllCardsPage />}
            />

            <Route
              path={routes.getViewCardPageRoute(routes.viewCardPageRouteParams)}
              element={<ViewCardPage />}
            />
            <Route
              path={routes.getNewCardPageRoute()}
              element={<NewCardPage />}
            />
            <Route path={routes.getForumPage()} element={<ForumPage />} />
            <Route
              path={routes.getRegistrationPage()}
              element={<RegistrationPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
