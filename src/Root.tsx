import { BrowserRouter, Route, Routes } from "react-router";
import { PATH } from "./constants/path";
import { App } from "./App";
import { Pages } from "./routes/routes";
import { Suspense } from "react";

export const Root = () => {
  return (
    <BrowserRouter>
      <Suspense fallback= {<div>Loading ...</div>}>
        <Routes>
          <Route path={PATH.WORKSPACE} element={<App />}>
            <Route index element={<Pages.WorkspacePage />} />
            <Route path={PATH.BITCOIN} element={<Pages.BitcoinTraficPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
