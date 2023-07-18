import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";

import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import app from "./lib/firebase";
import { useState } from "react";
import theme from "./theme";
import "@fontsource/roboto";
import AuthorItems from "./Pages/InventoryManagement/AuthorItems";
import NewStock from "./Pages/InventoryManagement/NewStock";
import { useAuthState } from "react-firebase-hooks/auth";
const dashboardRouter = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/inventory/author",
    element: <AuthorItems />,
  },
  {
    path: "/inventory/new_stock",
    element: <NewStock />,
  },
]);

function App() {
  const [user, loading, error] = useAuthState(getAuth());

  return (
    <ChakraProvider theme={theme}>
      {loading && (
        <Box w="100vw" h="100vh" bg="#FFFFEE">
          <Spinner position="absolute" top="50%" height="50%" color="#8093F1" />
        </Box>
      )}
      {!loading && user ? (
        <RouterProvider router={dashboardRouter} />
      ) : (
        <LoginPage />
      )}
    </ChakraProvider>
  );
}

export default App;
