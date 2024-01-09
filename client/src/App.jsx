import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/scss/base.scss";
import "boxicons";
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

// Pages
import Artworks from "./pages/artworks/Artworks";
import Marketplace from "./pages/marketplace/Marketplace";
import ShowcasingArtwork from "./pages/showcasingArtwork/ShowcasingArtwork";
import Artwork from "./pages/artwork/Artwork";
import Challenges from "./pages/challenges/Challenges";
import Challenge from "./pages/challenge/Challenge";
import Talents from "./pages/talents/Talents";
import Reviews from "./pages/reviews/Reviews";
// import Messenger from "./pages/messenger/Messenger";
import Commissions from "./pages/commissions/Commissions";
import Store from "./pages/store/Store";
import Layout from "./Layout";
import Pay from "./pages/pay/Pay";
import Order from "./pages/order/Order";

// import Success from "./pages/success/Success";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout showSidebar={true}></Layout>,
      children: [
        {
          path: "/talents/:id",
          element: <ShowcasingArtwork />,
        },
        {
          path: "/talents/:id/commissions",
          element: <Commissions />,
        },
        {
          path: "/talents/:id/store",
          element: <Store />,
        },
        {
          path: "/talents/:id/reviews",
          element: <Reviews />,
        },
      ],
    },
    {
      path: "/",
      element: <Layout showFilterBar={true}></Layout>,
      children: [
        {
          path: "/order",
          element: <Order />,
        },
        {
          path: "/order/pay",
          element: <Pay />,
        },
      ],
    },

    {
      path: "/",
      element: <Layout showFilterBar={true}></Layout>,
      children: [
        {
          path: "/artworks",
          element: <Artworks />,
        },
        {
          path: "/marketplace",
          element: <Marketplace />,
        },
        {
          path: "/talents",
          element: <Talents />,
        },
        // {
        //   path: "/artworks/:id",
        //   element: <Artwork />,
        // },
        // {
        //   path: "/challenges",
        //   element: <Challenges />,
        // },
        // {
        //   path: "/challenges/:id",
        //   element: <Challenge />,
        // },
        // {
        //   path: "/talents/:id",
        //   element: <Talent />,
        // },
        // {
        //   path: "/talents/:id/commissions",
        //   element: <Commissions />,
        // },
      ],
    },
  ]);

  // return <RouterProvider router={router} />;
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
