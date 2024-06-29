import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./context/UserContext";

import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";

import "./assets/css/reset.css";
import "./assets/css/variables.css";
import "./assets/css/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}
