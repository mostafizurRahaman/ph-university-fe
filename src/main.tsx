import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { persistore, store } from "./redux/store.ts";

// ** Step 7: Import PersistGate and Wrap the routes and provide  persistor for application:
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    <Toaster />
  </React.StrictMode>
);
