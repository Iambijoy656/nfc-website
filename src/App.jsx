import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import './index.css'
function App() {
  return (
    <div className="font-sans ">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;



{/* <nav className={scrolled ? " bg-black flex px-10 items-center justify-between z-10 h-20 sticky top-0 backdrop-filter backdrop-blur-2xl animate-nav-scroll opacity-0" : "flex px-10 items-center justify-between z-10 h-20 sticky top-0 bg-black"}>
<Link className="brand__logo" to="/">
  <h1 className="icon text-3xl font-serif cursor-pointer text-white ">
    Digital <span className="icon__name">Card</span>
  </h1>
</Link>
<div className="flex items-center gap-8 justify-end">
  <div className="flex text-aliceblue gap-5 uppercase font-nunito tracking-wide">
    <ul className="relative overflow-hidden group">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-aqua" : "absolute bottom-0 left-0 w-full h-0.5 bg-aqua opacity-0 transition-transform group-hover:opacity-100 transform group-hover:translate-x-0 group-focus:opacity-100 group-focus:translate-x-0"
          }
        >
          Home
        </NavLink>
      </li>

    </ul>
  </div>

  <div
    // onClick={handleArrowClose}
    className="account cursor-pointer relative flex gap-3 items-center rounded-md border-2 bg-black/30 border-zinc-800 px-2 py-1"
  >
    <span
      className="rounded-sm cursor-pointer p-1 text-white text-2xl my-1"
      style={{ backgroundColor: "aqua" }}
    >
      <FiChevronRight />
    </span>
    <span className="text-white text-lg">
      <p>Login</p>
    </span>
  </div>
</div>
<nav className="responsive__nav">
  {isClicked === true ? (
    <div
      // onClick={handleArrowOpen}
      className="flex relative rounded-md border-2 bg-black/30 border-gray-500 px-1 py-1 cursor-pointer"
    >
      <span
        className="rounded-sm p-2 w-full text-white text-2xl cursor-pointer"
        style={{ backgroundColor: "aqua" }}
      >
        <HiMenuAlt3 />
      </span>
      <div
        dir="rtl"
        className="flex flex-col text-aliceblue gap-4  font-nunito font-normal text-sm absolute uppercase text-white w-40 p-4 
              top-14 right-0 rounded-md"
      >
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "link-active" : "link"
              }
            >
             Home
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  ) : (
    <div
      // onClick={handleArrowClose}
      className="account cursor-pointer relative flex rounded-md border-2 bg-black/30 border-gray-500 p-1"
    >
      <span
        className="rounded-sm p-1 w-full text-white text-2xl cursor-pointer"
        style={{ backgroundColor: "aqua" }}
      >
        <HiMenuAlt3 />
      </span>
    </div>
  )}
</nav>
</nav> */}