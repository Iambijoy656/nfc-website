import { NavLink, Outlet } from "react-router-dom";

import Header from "../Shared/Header/Header";

const DashboardLayout = () => {
  const token = localStorage.getItem("access-token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <div className="border-b bg-white">
        <Header />
      </div>

      <div className="drawer lg:drawer-open mt-3">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        {(user?.role == "admin" || user?.role == "super_admin") && token && (
          <>
            <div className="drawer-side">
              <label
                htmlFor="dashboard-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 text-black lg:bg-none w-80 h-full  bg-white border-r">
                {(user?.role == "admin" || user?.role == "super_admin") &&
                  token && (
                    <>
                      <li className="mb-2">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                              : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                          }
                          end
                          to="/dashboard/cardInitialization"
                        >
                          Card Initialization
                        </NavLink>
                      </li>{" "}
                      <li className="mb-2">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                              : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                          }
                          end
                          to="/dashboard/transaction-list"
                        >
                          Transaction List
                        </NavLink>
                      </li>{" "}
                      <li className="mb-2">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                              : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                          }
                          end
                          to="/dashboard/subscriptions"
                        >
                          Subscriptions
                        </NavLink>
                      </li>{" "}
                      <li className="mb-2">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                              : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                          }
                          end
                          to="/dashboard/memberList"
                        >
                          Member List
                        </NavLink>
                      </li>{" "}
                      <li className="mb-2">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                              : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                          }
                          end
                          to="/dashboard/adminList"
                        >
                          Admin List
                        </NavLink>
                      </li>{" "}
                    </>
                  )}
                {/* <li className="mb-2">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                    : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                }
                end
                to="/dashboard/profile"
              >
                Profile
              </NavLink>
            </li> */}

                <li className="mb-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                        : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                    }
                    end
                    to="/dashboard/tamplates"
                  >
                    Templates
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                        : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                    }
                    end
                    to="/dashboard/new-card-orders"
                  >
                    New Card Orders
                  </NavLink>
                </li>

                <li className="mb-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                        : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                    }
                    end
                    to="/dashboard/manual-payment"
                  >
                    Manual Payment List
                  </NavLink>
                </li>

                <li className="mb-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                        : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                    }
                    end
                    to="/dashboard/payment-options"
                  >
                    Payment Options
                  </NavLink>
                </li>

                <li className="mb-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                        : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                    }
                    end
                    to="/dashboard/card-variant"
                  >
                    Card Variant
                  </NavLink>
                </li>

                <li className="mb-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "font-medium   text-orange-600  transition-colors duration-200 bg-transparent"
                        : "font-medium   text-gray-700 transition-colors duration-200 bg-transparent"
                    }
                    end
                    to="/dashboard/profile-page"
                  >
                    Profile Page
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
