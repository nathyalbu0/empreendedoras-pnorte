import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Institucional from './pages/Institucional';
import Parceiros from './pages/Parceiros';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'institucional',
        element: <Institucional />,
      },
      {
        path: 'parceiros',
        element: <Parceiros />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);