import { Link, Outlet } from "react-router";

const DashboardNav = () => {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center lg:min-h-screen">
          {/* Page content here */}
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {/* Normal users routes */}
            <li>
              <Link to="myProfile">
                <p>My Profile</p>
              </Link>
            </li>
            <li>
              <Link to="addPost">
                <p>Add Post</p>
              </Link>
            </li>
            <li>
              <Link to="myPosts">
                <p>My Posts</p>
              </Link>
            </li>
            {/* Admin Routes */}

            <li>
              <Link to="adminProfile">
                <p>Admin Profile</p>
              </Link>
            </li>
            {/* Shared NavLinks */}
            <li>
              <Link to="/">
                <p>Home</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;
