import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import type { Navigation } from "./types/navigation";

export default function App() {
  const navigation: Navigation = [{ path: "/", element: <Home /> }];

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
