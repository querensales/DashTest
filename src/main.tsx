import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from './pages/LoginPage.tsx'
import MainPage from './pages/MainPage.tsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/', //raiz do site
    element: <MainPage />,
  },
  {
    path: '/login', 
    element: <LoginPage />, 
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);