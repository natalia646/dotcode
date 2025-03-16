import { Outlet } from "react-router";
import { Navigation } from "./components/Navigation/Navigation";

export const App = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
