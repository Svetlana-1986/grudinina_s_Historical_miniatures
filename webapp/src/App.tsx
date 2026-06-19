import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import * as routes from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { MainCardPage } from './pages/MainCardPage';
import { AllCardsPage } from './pages/AllCardsPage';
import { ViewCardPage } from './pages/ViewCardPage';
import { NewCardPage } from './pages/NewCardPage';
import { BlogPage } from './pages/BlogPage';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
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
            <Route path={routes.getBlogRoutePage()} element={<BlogPage />} />
            <Route
              path={routes.getSignUpRoutePage()}
              element={<SignUpPage />}
            />
            <Route
              path={routes.getSignInRoutePage()}
              element={<SignInPage />}
            />

            <Route
              path={routes.getProfileRoutePage ()}
              element={<ProfilePage />}
            />

            <Route
              path={routes.getAboutRoutePage ()}
              element={<AboutPage />}
            />

            {/* <Route path="/profile" element={<ProfilePage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
