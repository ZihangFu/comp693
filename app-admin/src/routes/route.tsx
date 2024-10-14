import App from "../App";
import Page from "../pages/Page";
import User from "../pages/User";
import Activity from "../pages/Activity";
import Login from "../pages/Login";

import {
  createBrowserRouter,
} from "react-router-dom";

let router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <div><h3>Welcome to the esteemed administrator</h3></div>
      },
      {
        path: "/category",
        element: <Page />,
      },
      {
        path: "/user",
        element: <User />
      },
      {
        path: "/venue",
        element: <Activity />
      },
    ]
  },
]);

export default router;
