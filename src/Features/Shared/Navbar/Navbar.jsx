import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../../../Hooks/useAuth";
import useUserData from "../../../Hooks/User/useUserData";

const Navbar = () => {
  const { signOut, loading: authLoading, user: authUser } = useAuth();

  const { data: mongoUser, isLoading, isError } = useUserData(authUser?.email);

  // Logout

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    });

    if (result.isConfirmed) {
      // Show loading state
      Swal.fire({
        title: "Logging out...",
        text: "Please wait while we log you out.",
        allowOutsideClick: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await signOut();
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: `${error}`,
          text: "Failed to log out. Please try again.",
          icon: "error",
        });
      }
    }
  };
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/membership">Membership</NavLink>
      </li>
      <li>
        <NavLink>Notification icon</NavLink>
      </li>
    </>
  );
  if (authLoading) {
    return (
      <span className="loading loading-ring loading-xl text-blue-700"></span>
    );
  }
  if (isLoading)
    return (
      <span className="loading loading-ring loading-xl text-blue-700"></span>
    );
  if (isError) return <div>Error loading user data</div>;
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/">
            <h1 className="pl-4 text-xl">Forum X</h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end pr-8 relative py-3">
          {authUser && (
            <div className="absolute z-10 top-0 right-5 text-3xl ">
              {mongoUser?.badge === "Bronze" ? "🥈" : "🥇"}
            </div>
          )}
          {authUser ? (
            <div className="dropdown dropdown-end">
              <div
                className="btn btn-ghost btn-circle btn-lg w-[60px] h-[60px] avatar"
                tabIndex={0}
                role="button"
              >
                <div className="hover:ring-accent ring-offset-base-100 rounded-full hover:ring ring-offset-2">
                  <img src={authUser?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <p className="pointer-events-none border border-yellow-900 uppercase text-[12px]">
                    {authUser?.displayName}
                  </p>
                </li>
                <li>
                  <Link to="/dashboardPage">
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="p-3 border border-transparent hover:border-stone-500 cursor-pointer">
                Join Us
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
