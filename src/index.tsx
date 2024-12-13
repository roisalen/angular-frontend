import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { OrganizationProvider } from './context/OrganizationContext';
import './i18n/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <OrganizationProvider>
      <App />
    </OrganizationProvider>
  </React.StrictMode>
); 