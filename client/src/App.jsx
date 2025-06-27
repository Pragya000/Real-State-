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
