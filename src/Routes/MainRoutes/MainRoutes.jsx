import { Route, Routes } from "react-router";
import Home from "../../Pages/Home/Home/Home";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import About from "../../Pages/About/About";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
