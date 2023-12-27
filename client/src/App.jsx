import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./assets/scss/base.scss";
import "boxicons";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// Components
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Conversations from "./components/conversations/Conversations";

// Pages
import Artworks from "./pages/artworks/Artworks";
import Artwork from "./pages/artwork/Artwork";
import Challenges from "./pages/challenges/Challenges";
import Challenge from "./pages/challenge/Challenge";
import Talents from "./pages/talents/Talents";
import Talent from "./pages/talent/Talent";
// import Messenger from "./pages/messenger/Messenger";
import Commissions from "./pages/commissions/Commissions";

// import Success from "./pages/success/Success";

function App() {
  const Layout = ({ showSidebar, talent }) => {
    return (
      <div
        className={`app ${showSidebar ? "with-sidebar" : "without-sidebar"}`}
      >
        <Navbar />
        <Conversations />

        {showSidebar && (
          <div class="talent-profile">
            <div className="talent-profile--left">
              <Sidebar talent={talent} />
            </div>
            <div className="talent-profile--right">
              <img src={talent} className="talent-profile__bg-img" />
              <div className="talent-profile__button-container">
                <div className="talent-profile__button-container--left">
                  <button className="talent-profile__button-item active">
                    <i className="bx bx-palette"></i>
                    Artworks
                  </button>
                  <button className="talent-profile__button-item">
                    <i className="bx bx-info-circle"></i>
                    About
                  </button>
                  <button className="talent-profile__button-item">
                    <i className="bx bx-cart"></i>
                    Commissions
                  </button>
                  <button className="talent-profile__button-item">
                    <i className="bx bx-star"></i>
                    Reviews
                  </button>
                </div>

                <div className="talent-profile__button-container--right">
                  <button className="talent-profile__button-item active mg-0">
                    <i className="bx bx-palette"></i>
                    Upload artwork
                  </button>
                </div>
              </div>
              <hr />
              <Outlet />
            </div>
          </div>
        )}

        {!showSidebar && <Outlet />}
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout showSidebar={true}></Layout>,
      children: [
        {
          path: "/talents/:id",
          element: <Talent />,
        },
        {
          path: "/talents/:id/commissions",
          element: <Commissions />,
        },
      ],
    },
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: "/artworks",
          element: <Artworks />,
        },
        // {
        //   path: "/messenger",
        //   element: <Messenger />,
        // },
        {
          path: "/artworks/:id",
          element: <Artwork />,
        },
        {
          path: "/challenges",
          element: <Challenges />,
        },
        {
          path: "/challenges/:id",
          element: <Challenge />,
        },
        {
          path: "/talents",
          element: <Talents />,
        },
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
