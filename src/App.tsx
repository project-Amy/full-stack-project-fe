import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BoardDetails from "./pages/BoardDetails";
import type { Navigation } from "./types/navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthMiddleware from "./components/AuthMiddleware";

export default function App() {
  const navigation: Navigation = [
    {
      path: "/",
      element: (
        <AuthMiddleware>
          <Home />
        </AuthMiddleware>
      ),
    },
    {
      path: "/details/:id",
      element: (
        <AuthMiddleware>
          <BoardDetails />
        </AuthMiddleware>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {navigation.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
