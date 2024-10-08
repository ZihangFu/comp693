import React from "react";
import App from "../App";
import Page from "../pages/Page";
import User from "../pages/User";
import Activity from "../pages/Activity";
import Comment from "../pages/Comment";
import Login from "../pages/Login";
import PagesAdd from "../pages/PagesAdd";
import ActivityAdd from "../pages/ActivityAdd";
import PageDest from "../pages/PageDesc";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  let router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/test",
      element:<PageDest/>
    },
    {
      path: "/pageDesc/:id",
      element: <PageDest/>
    },
    {
      path: "/",
      element:<App/>,
      children:[
        {
          path: "/",
          element: <div><h3>Welcome to the esteemed administrator</h3></div>
        },
        {
          path: "/page",
          element: <Page/>,
        },
        {
          path: "/user",
          element: <User/>
        },
        {
          path: "/activity",
          element: <Activity/>
        },
        // {
        //   path: "/comment",
        //   element: <Comment/>
        // }
      ]
    },
    {
        path: "/pageAdd/:id",
        element: <PagesAdd/>
    },
    {
        path: "/ActivityAdd/:id",
        element: <ActivityAdd/>
    },
  ]);

  export default router;
  