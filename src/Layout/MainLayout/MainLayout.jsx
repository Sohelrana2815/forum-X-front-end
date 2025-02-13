import { Outlet } from "react-router";
import Navbar from "../../Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
