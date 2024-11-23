import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routers/routers.route";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </>
  );
};
