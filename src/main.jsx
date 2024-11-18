import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import './index.css';
import App from './App.jsx';

import ProductsList from './components/ProductsList';
import ErrorPage from './assets/ErrorPage.jsx';
import NotFoundPage from './assets/NotFoundPage.jsx';
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact.jsx';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';
import EditContact, { action as editAction } from './routes/edit.jsx';
import { action as destroyAction } from './routes/destroy';
import ContactLayout from './layouts/ContactLayout';
import DefaultLayout from './layouts/DefaultLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route element={<DefaultLayout />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<App />} />
          <Route path="/products" element={<ProductsList />} />
        </Route>
        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="contacts/:contactId" element={<ContactLayout />}>
        <Route errorElement={<ErrorPage />}>
          <Route
            index
            element={<Contact />}
            loader={contactLoader}
            action={contactAction}
          />
          <Route
            path="edit"
            element={<EditContact />}
            loader={contactLoader}
            action={editAction}
          />
          <Route path="destroy" action={destroyAction} />
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
