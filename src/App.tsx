// import { useState } from 'react'
import { Outlet } from "react-router";
import { Navigation } from "./components/Navigation/Navigation";

export const App = () => {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default App;
