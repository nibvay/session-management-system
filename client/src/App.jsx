import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Roots";
import ErrorPage from "./ErrorPage";
import Sessions from "./components/Sessions";
import Attendees from "./components/Attendees";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "sessions",
        element: <Sessions />,
      },
      {
        path: "attendees",
        element: <Attendees />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
