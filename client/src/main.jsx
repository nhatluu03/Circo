import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./contexts/user.context.jsx";
// import { QueryClient, QueryClientProvider, useQuery } from "react-query";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={new QueryClient()}> */}
      <UserProvider>
        <App />
      </UserProvider>
    {/* </QueryClientProvider> */}
  </React.StrictMode>
);
