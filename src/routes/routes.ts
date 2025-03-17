import { lazy } from 'react';

export const Pages = {
  WorkspacePage: lazy(() => import('../pages/WorkspacePage')),
  BitcoinTraficPage: lazy(() => import('../pages/BitcoinTraficPage')),
};