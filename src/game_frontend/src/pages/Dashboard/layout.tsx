import { Outlet } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./index.css";
import { Suspense } from "react";
import Loader from "../../components/ui/Loader";
const Layout = () => {
  useDocumentTitle("Dashboard | StarDust Adventures");
  return (
    <div
      className="exchange  scrollbar-hide  "
      style={{
        backgroundImage: 'url("/assets/images/space-exchange-bg.webp")',
        width: '100vw',           // Full viewport width
        height: '100vh',         // Full viewport height  
        backgroundSize: 'cover', // Scale the image to cover the container
      }}
    >
      <Navbar />
      <Sidebar />
      <Suspense fallback={<Loader/>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
