import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import './i18n';
 
import { LoginPage } from './pages/LoginPage/LoginPage.tsx';
import { MainPage } from './pages/MainPage/MainPage.tsx';

import { AuthProvider } from './contexts/AuthContext.tsx';
import { ThemeProvider } from './contexts/ChangeTheme.tsx';

import { ProtectedRoute } from './components/ProtectedRoute.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Carregando...</div>}></Suspense>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);