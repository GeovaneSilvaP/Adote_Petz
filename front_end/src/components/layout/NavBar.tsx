import { Link, useLocation } from "react-router-dom";
import { PawPrint, LogIn, UserPlus } from "lucide-react";

const NavBar = () => {
  const location = useLocation();

  const linkClass = (path: string) =>
    `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? "bg-orange-100 text-orange-700"
        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-orange-600 transition-opacity hover:opacity-80"
        >
          <PawPrint className="h-6 w-6" strokeWidth={2} />
          <span className="text-base font-semibold tracking-tight text-stone-800">
            adote<span className="text-orange-500">pet</span>
          </span>
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-1">
          <li>
            <Link to="/" className={linkClass("/")}>
              <PawPrint className="h-4 w-4" strokeWidth={1.75} />
              Adotar
            </Link>
          </li>
          <li>
            <Link to="/login" className={linkClass("/login")}>
              <LogIn className="h-4 w-4" strokeWidth={1.75} />
              Entrar
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-orange-600 active:scale-95"
            >
              <UserPlus className="h-4 w-4" strokeWidth={1.75} />
              Cadastrar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;