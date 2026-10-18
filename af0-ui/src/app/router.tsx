import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { StoryPage } from '../features/story/StoryPage';
import { BeansPage } from '../features/beans/BeansPage';
import { DrinksPage } from '../features/drinks/DrinksPage';
import { GearMapPage } from '../features/gear-map/GearMapPage';
import { AdminLoginPage } from '../features/admin/pages/AdminLoginPage';
import { AdminDashboardPage } from '../features/admin/pages/AdminDashboardPage';
import { AdminOrdersPage } from '../features/admin/pages/AdminOrdersPage';
import { AdminProductsPage } from '../features/admin/pages/AdminProductsPage';
import { AdminSchedulePage } from '../features/admin/pages/AdminSchedulePage';
import { AdminContactsPage } from '../features/admin/pages/AdminContactsPage';
import { getAdminBasePath } from '../services/api/httpClient';

const adminBase = getAdminBasePath();

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <StoryPage /> },
      { path: 'beans', element: <BeansPage /> },
      { path: 'drinks', element: <DrinksPage /> },
      { path: 'gear-map', element: <GearMapPage /> },
    ],
  },

  {
    path: `${adminBase}/login`,
    element: <AdminLoginPage />,
  },

  {
    path: adminBase,
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'orders', element: <AdminOrdersPage /> },
          { path: 'products', element: <AdminProductsPage /> },
          { path: 'schedule', element: <AdminSchedulePage /> },
          { path: 'contacts', element: <AdminContactsPage /> },
        ],
      },
    ],
  },

  // Fallback
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

