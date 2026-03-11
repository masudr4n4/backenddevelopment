import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/profile", label: "Profile" },
  { to: "/info-board", label: "Info Board" },
  { to: "/tic-tac-toe", label: "Tic Tac Toe" },
  { to: "/calculator", label: "Calculator" },
  { to: "/timer", label: "Timer" },
  { to: "/todos", label: "Todos" },
];

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar bg-base-200 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <NavLink to="/" className="btn btn-ghost text-xl font-bold gap-2">
          <span className="text-primary">Todo</span>
          <span className="text-base-content/80">App</span>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 px-1">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `rounded-lg ${isActive ? "bg-primary text-primary-content font-medium" : "hover:bg-base-300"}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            {isLoggedIn ? (
              <button
                type="button"
                className="btn btn-ghost rounded-lg hover:bg-error/20 text-error"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `rounded-lg ${isActive ? "bg-primary text-primary-content font-medium" : "hover:bg-base-300"}`
                }
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
      <div className="navbar-end lg:hidden">
        <details className="dropdown dropdown-end">
          <summary className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-56 p-2 shadow-lg">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `rounded-lg ${isActive ? "bg-primary text-primary-content" : ""}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              {isLoggedIn ? (
                <button
                  type="button"
                  className="btn btn-ghost rounded-lg text-error"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <NavLink to="/login" className="rounded-lg">
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </details>
      </div>
    </header>
  );
}
