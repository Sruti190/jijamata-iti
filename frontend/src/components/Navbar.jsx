import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/admissions", label: "Admissions" },
  { to: "/apply", label: "Enquiry" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 shadow-sm" data-testid="navbar">
      {/* Top contact strip */}
      <div className="bg-[var(--brand)] text-white text-xs">
        <div className="container-x py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-5">
            <a href="tel:02427255376" className="flex items-center gap-2 hover:text-[var(--gold)]"><i className="fa-solid fa-phone" /> 02427-255376</a>
            <a href="mailto:Jijamata_Iti@Yahoo.Com" className="flex items-center gap-2 hover:text-[var(--gold)]"><i className="fa-solid fa-envelope" /> Jijamata_Iti@Yahoo.Com</a>
          </div>
          <div className="hidden md:block text-white/90">ITI Code: PR27000096 | Estd. 1984 | Government Recognized</div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b hairline">
        <div className="container-x flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-4" data-testid="nav-logo">
            <img
              src="https://customer-assets.emergentagent.com/job_iti-admissions-hub/artifacts/imnrlgx5_Logo1.png"
              alt="Shri Marutrao Ghule Patil Shikshan Sanstha"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
            <div className="leading-tight">
              <div className="font-serif font-bold text-xl md:text-2xl text-[var(--ink)]">
                Jijamata Private Industrial Training Institute
              </div>
              <div className="text-xs md:text-sm text-slate-500 mt-1">Bhenda · Tal. Newasa · Dist. Ahmednagar</div>
            </div>
          </Link>
          <nav className="hidden xl:flex items-center gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium px-4 py-2 rounded-md transition-colors ${isActive ? "bg-[var(--brand-tint)] text-[var(--brand)]" : "text-slate-700 hover:text-[var(--brand)]"}`
                }
                data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <button
            className="xl:hidden p-2"
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"} text-xl text-[var(--ink)]`} />
          </button>
        </div>
        {open && (
          <div className="xl:hidden border-t hairline bg-white">
            <div className="container-x py-3 flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-2 px-3 rounded text-sm font-medium ${isActive ? "text-[var(--brand)] bg-[var(--brand-tint)]" : "text-slate-700"}`
                  }
                  data-testid={`nav-mobile-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
