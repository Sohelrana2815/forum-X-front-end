import { Route, Routes } from "react-router";
import Home from "../../Pages/Home/Home/Home";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import Login from "../../Pages/Auth/Login/Login";
import Register from "../../Pages/Auth/Register/Register";
import About from "../../Pages/About/About";
import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute";
import Dashboard from "../../Dashboard/Dashboard";
import MyProfile from "../../Dashboard/MyProfile/MyProfile";
import CreatePost from "../../Dashboard/CreatePost/CreatePost";
import MyPosts from "../../Dashboard/MyPosts/MyPosts";

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

        {/* Dashboard routes */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route element={<MyProfile />} />
          <Route path="myProfile" element={<MyProfile />} />
          <Route path="createPost" element={<CreatePost />} />
          <Route path="myPosts" element={<MyPosts />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
