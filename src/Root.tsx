import { BrowserRouter, Route, Routes } from "react-router";
import { PATH } from "./constants/path";
import { WorkspacePage } from "./pages/WorkspacePage";
import { BitcoinTraficPage } from "./pages/BitcoinTraficPage";
import { App } from "./App";

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.WORKSPACE} element={<App />}>
          <Route index element={<WorkspacePage />} />
          <Route path={PATH.BITCOIN} element={<BitcoinTraficPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
