import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers';
import { appRouter } from './router';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <RouterProvider router={appRouter} />
    </AppProviders>
  );
};

export default App;

