import { PawPrint, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Top row */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-stone-700 transition-opacity hover:opacity-70"
          >
            <PawPrint className="h-5 w-5 text-orange-500" strokeWidth={2} />
            <span className="text-sm font-semibold tracking-tight">
              adote<span className="text-orange-500">pet</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-5">
            <Link
              to="/"
              className="text-sm text-stone-500 transition-colors hover:text-orange-500"
            >
              Adotar
            </Link>
            <Link
              to="/login"
              className="text-sm text-stone-500 transition-colors hover:text-orange-500"
            >
              Entrar
            </Link>
            <Link
              to="/register"
              className="text-sm text-stone-500 transition-colors hover:text-orange-500"
            >
              Cadastrar
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-stone-200" />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="flex items-center gap-1.5 text-sm text-stone-500">
            Feito com
            <Heart className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
            por{" "}
            <span className="font-medium text-stone-700">adote seu pet</span>
          </p>
          <p className="text-xs text-stone-400">&copy; {new Date().getFullYear()} — Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;