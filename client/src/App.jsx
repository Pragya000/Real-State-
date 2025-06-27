import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Home from "./Pages/home/Home";
import List from "./Pages/list/List";
import {Layout , RequireAuth} from "./Pages/layout/Layout";
import Single from "./Pages/single/Single";
import Profile from "./Pages/profile/Profile";
import Register from "./Pages/register/Register";
import Login from "./Pages/login/Login";
import ProfileUpdate from "./Pages/profileUpdate/profileUpdate";
import NewPostPage from "./Pages/newPost/NewPost";
import { listPageLoader, singlePageLoader , profilePageLoader} from "./lib/loaders/loaders";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/list",
          element: <List />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <Single />,
          loader: singlePageLoader,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        // ✅ Protected routes (RequireAuth wraps element directly)
        {
          path: "/profile",
          element: <RequireAuth><Profile /></RequireAuth>,
          loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <RequireAuth><ProfileUpdate /></RequireAuth>,
        },
        {
          path: "/add",
          element: <RequireAuth><NewPostPage /></RequireAuth>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
