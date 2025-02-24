import { Route, Routes } from "react-router";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Auth/Login/Login";
import Register from "../../Pages/Auth/Register/Register";
import About from "../../Pages/About/About";
import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import MyPosts from "../../Features/User/UserDashboard/MyPosts/MyPosts";
import AdminProfile from "../../Features/Admin/AdminDashboard/AdminProfile/AdminProfile";
import DashboardNav from "../../Components/Layout/DashboardLayout/DrawerNav";
import MyProfile from "../../Features/User/UserDashboard/MyProfile/MyProfile";
import AddPost from "../../Features/User/UserDashboard/AddPost/AddPost";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        {/* Home page routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* User Dashboard routes */}
        <Route path="dashboard" element={<DashboardNav />}>
          <Route path="myProfile" element={<MyProfile />} />
          <Route path="createPost" element={<AddPost />} />
          <Route path="myPosts" element={<MyPosts />} />
        </Route>
        {/* Admin Dashboard routes */}
        <Route path="adminProfile" element={<AdminProfile />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
