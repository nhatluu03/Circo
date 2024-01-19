// Components
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Conversations from "./components/conversations/Conversations";
import { Outlet } from "react-router-dom";
import Talent from "./pages/talent/Talent";
import Client from "./pages/client/Client";
import FieldSlider from "./components/fieldSlider/FieldSlider";

export default function Layout({ showSidebar, userRole, showFilterBar }) {
  return (
    <div className={`app ${showSidebar ? "with-sidebar" : "without-sidebar"}`}>
      <Navbar />
      <Conversations />
      {showSidebar ? 
      (userRole == "talent" && <Talent />) || (userRole == "client" && <Client />) : <Outlet />}
      {/* {showFilterBar ? (
        <>
          <FieldSlider showFilterBar={showFilterBar} fields={fields} setShowFilterBar={setShowFilterBar} />
            
          <div className="layout-with-filter-bar">
            <div className="layout-with-filter-bar--left">
              FILTERBAR
            </div>
            <div className="layout-with-filter-bar--right">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )} */}
    </div>
  );
}
