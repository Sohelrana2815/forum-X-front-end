import { Route, Routes } from "react-router";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Auth/Login/Login";
import Register from "../../Pages/Auth/Register/Register";
import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import MyPosts from "../../Features/User/UserDashboard/MyPosts/MyPosts";
import AdminProfile from "../../Features/Admin/AdminDashboard/AdminProfile/AdminProfile";
import DashboardNav from "../../Components/Layout/DashboardLayout/DrawerNav";
import MyProfile from "../../Features/User/UserDashboard/MyProfile/MyProfile";
import AddPost from "../../Features/User/UserDashboard/AddPost/AddPost";
import PostDetails from "../../Pages/Home/Posts/PostDetails";
import Membership from "../../Pages/About/Membership";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        {/* Home page routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="membership"
            element={
              <PrivateRoute>
                <Membership />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="postDetails/:id" element={<PostDetails />} />
        </Route>

        {/* User Dashboard routes */}
        <Route path="dashboardPage" element={<DashboardNav />}>
          <Route path="myProfile" element={<MyProfile />} />
          <Route path="addPost" element={<AddPost />} />
          <Route path="myPosts" element={<MyPosts />} />
          {/* Admin Dashboard routes */}
          <Route path="adminProfile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
