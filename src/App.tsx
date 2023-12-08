import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { SystemOverviewPage, BatteryPage } from './pages';
import { Layout } from './components';

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
    path: '/battery/:id',
    element: (
      <Layout>
        <BatteryPage />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
