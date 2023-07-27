import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";

import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import supabase from "./lib/supabase";
import { useEffect, useState } from "react";
import theme from "./theme";
import "@fontsource/roboto";
import AuthorItems from "./Pages/InventoryManagement/AuthorItems";
import NewStock from "./Pages/InventoryManagement/NewStock";
import { useAuthState } from "react-firebase-hooks/auth";
import RemoveStock from "./Pages/InventoryManagement/RemoveStock";
import Debug from "./Pages/Debug";
import DocGenHistory from "./Pages/Documents/GenHistory";
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
  {
    path: "/inventory/remove_stock",
    element: <RemoveStock />,
  },
  {
    path: "/snapshots/history",
    element: <DocGenHistory />,
  },
  {
    path: "/debug",
    element: <Debug />,
  },
]);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, session }) => {
      setUser(data.session);
    });
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      supabase.auth.getSession().then(({ data, error }) => {
        setUser(data.session);
      });
    });
  }, []);
  return (
    <ChakraProvider theme={theme}>
      {/* {loading && (
        <Box w="100vw" h="100vh" bg="#FFFFEE">
          <Spinner position="absolute" top="50%" height="50%" color="#8093F1" />
        </Box>
      )} */}
      {user ? <RouterProvider router={dashboardRouter} /> : <LoginPage />}
    </ChakraProvider>
  );
}

export default App;
