import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";


function App() {
  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
