import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import PhotoDisplay from "./components/PhotoDisplay.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <PhotoDisplay /> }],
  },
]);

export default router;
