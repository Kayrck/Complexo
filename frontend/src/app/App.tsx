import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SilkBackgroundDriver } from './components/SilkBackgroundDriver';

export default function App() {
  return (
    <ErrorBoundary>
      <SilkBackgroundDriver />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
