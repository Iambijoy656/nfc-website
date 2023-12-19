// import { useEffect, } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  window.onscroll = () => {
    if (window.scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("access-token");
  //   localStorage.removeItem("user");
  //   navigate("/");
  // };

  // useEffect(() => {
  //   if (token) {
  //     if (user?.role === "member") {
  //       api
  //         .get(`members/${user?.member}`)
  //         .then((res) => {
  //           // setUserInfo(res.data.data);
  //           console.log(res.data);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //     if (user?.role === "admin") {
  //       api
  //         .get(`admins/${user?.admin}`)
  //         .then((res) => {
  //           // setUserInfo(res.data.data);
  //           console.log(res.data);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }
  // }, [user?.member, user?.role, user?.admin, token]);

  const menuItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-[16px]    text-white underline underline-offset-2 transition-colors duration-200 bg-transparent"
              : "font-medium text-[16px]    text-gray-300 transition-colors duration-200 bg-transparent"
          }
          end
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-[16px]    text-white underline underline-offset-2 transition-colors duration-200 bg-transparent"
              : "font-medium text-[16px]    text-gray-300 transition-colors duration-200 bg-transparent"
          }
          end
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-[16px]    text-white underline underline-offset-2 transition-colors duration-200 bg-transparent"
              : "font-medium text-[16px]    text-gray-300 transition-colors duration-200 bg-transparent"
          }
          end
        >
          products
        </NavLink>
      </li>{" "}
      <li>
        <NavLink
          to="/corporate"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-[16px]    text-white underline underline-offset-2 transition-colors duration-200 bg-transparent"
              : "font-medium text-[16px]    text-gray-300 transition-colors duration-200 bg-transparent"
          }
          end
        >
          Corporate
        </NavLink>
      </li>{" "}
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-[16px]    text-white underline underline-offset-2 transition-colors duration-200 bg-transparent"
              : "font-medium text-[16px]    text-gray-300 transition-colors duration-200 bg-transparent"
          }
          end
        >
          Contact Us
        </NavLink>
      </li>
      <li className="block lg:hidden">
        <Link className="font-medium text-[16px]   text-gray-100 transition-colors duration-200 bg-transparent">
          Login
        </Link>
        <div>
          <Link className="font-medium text-[15px]  text-gray-100  bg-transparent outline outline-1 outline-red-500 p-2 rounded hover:bg-red-500  transition duration-150">
            Create Your Card
          </Link>
        </div>
      </li>
    </>
  );

  return (
    // backdrop-filter backdrop-blur-xl
    <div
      className={
        scrolled
          ? " w-full flex  items-center justify-between z-10 h-20 fixed top-0 bg-[#232323] animate__animated animate__fadeInDown animate-fast opacity-0"
          : "flex items-center justify-between z-10 h-20 fixed top-0 w-full"
      }
    >
      <div className="navbar container">
        <div className="navbar-start ">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm bg-[#232323] lg:hidden mr-3 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 bg-[#232323]"
            >
              {menuItems}
            </ul>
          </div>
          <Link to={"/"} className="text-xl md:text-2xl lg:text-4xl font-bold ">
            Digital Card
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
        <div className="navbar-end mx-5 flex items-center gap-2 md:gap-5 ">
          <div className="hidden lg:block">
            <Link className="font-medium text-[16px]   text-gray-100 transition-colors duration-200 bg-transparent">
              Login
            </Link>
            <Link className="font-medium text-[15px] mx-2  text-gray-100  bg-transparent outline outline-1 outline-red-500 p-2 rounded-full hover:bg-red-500  transition duration-150">
              Create Your Card
            </Link>
          </div>
          <div className="indicator">
            <FaCartShopping className="text-white text-xl" />
            <span className="badge badge-sm indicator-item  font-bold">0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
