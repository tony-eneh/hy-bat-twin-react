import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { SystemOverviewPage, BatteryPage } from './pages';
import { Layout } from './components';
import HelpPage from './pages/HelpPage';
import ProfilePage from './pages/ProfilePage';
import BatteriesPage from './pages/BatteriesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <SystemOverviewPage />
      </Layout>
    ),
  },
  {
    path: '/batteries',
    element: (
      <Layout>
        <BatteriesPage />
      </Layout>
    ),
  },
  {
    path: '/batteries/:id',
    element: (
      <Layout>
        <BatteryPage />
      </Layout>
    ),
  },
  {
    path: '/help',
    element: (
      <Layout>
        <HelpPage />
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <ProfilePage />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
