// Components
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Conversations from "./components/conversations/Conversations";
import { Outlet } from "react-router-dom";
import Talent from "./pages/talent/Talent";


export default function Layout ({ showSidebar, talent }) {
  return (
    <div
      className={`app ${showSidebar ? "with-sidebar" : "without-sidebar"}`}
    >
      <Navbar />
      <Conversations />
      {showSidebar ? <Talent/> : <Outlet />}
    </div>
  );
};