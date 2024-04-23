import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./routes/Homepage";
import ErrorPage from "./error-page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Register from "./routes/Register.tsx";
import Login from "./routes/Login.tsx";
import Contacts from "./routes/Contacts.tsx";
import AddContact from "./routes/AddContact.tsx";
import ParentView from "./routes/ParentView.tsx";
import EditContact from "./routes/EditContact.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contacts",
    element: <ParentView />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "all-contacts",
        element: <Contacts />,
        errorElement: <ErrorPage />,
      },
      {
        path: "add-contacts",
        element: <AddContact />,
        errorElement: <ErrorPage />,
      },
      {
        path: "edit-contact/:contact_id",
        element: <EditContact />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
