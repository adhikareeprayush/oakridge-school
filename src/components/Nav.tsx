import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useMockAuth } from "../hooks/useMockAuth";
import { SITE_NAME } from "../constants/site";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "font-bold leading-6 tracking-wide text-[14px] transition-colors",
    isActive ? "text-primary" : "text-secondText hover:text-text",
  ].join(" ");

/**
 * Marketing navigation + authenticated shortcuts (mock session).
 * Mobile sheet mirrors desktop links for parity.
 */
const Nav = () => {
  const [open, setOpen] = useState(false);
  const { user, logout, dashboardPath } = useMockAuth();

  const links = (
    <>
      <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/courses" className={navLinkClass} onClick={() => setOpen(false)}>
        Courses
      </NavLink>
      <NavLink to="/pricing" className={navLinkClass} onClick={() => setOpen(false)}>
        Pricing
      </NavLink>
      <NavLink to="/about" className={navLinkClass} onClick={() => setOpen(false)}>
        About
      </NavLink>
      <NavLink to="/faq" className={navLinkClass} onClick={() => setOpen(false)}>
        FAQ
      </NavLink>
      <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
        Contact
      </NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-lightGray2 bg-white/95 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between px-[16px] py-[16px] md:px-[60px] lg:px-[100px] xl:px-[200px]">
        <Link to="/" className="text-lg font-bold text-text md:text-xl">
          {SITE_NAME}
        </Link>

        <div className="hidden items-center gap-6 lg:flex">{links}</div>

        <div className="hidden items-center gap-[44px] lg:flex">
          {user && dashboardPath ? (
            <>
              <Link to={dashboardPath} className="btn font-semibold text-primary hover:underline">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="btn text-secondText hover:text-text"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn text-primary">
                Login
              </Link>
              <Link
                to="/signup"
                className="btn rounded-[5px] bg-primary px-[25px] py-[15px] text-white"
              >
                Join Us -&gt;
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-text lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-lightGray2 bg-white px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">{links}</div>
          <div className="mt-6 flex flex-col gap-3 border-t border-lightGray2 pt-4">
            {user && dashboardPath ? (
              <>
                <Link
                  to={dashboardPath}
                  className="rounded-lg bg-fadedPrimary py-3 text-center font-bold text-primary"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  className="rounded-lg border border-lightGray2 py-3 font-bold text-text"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg border border-lightGray2 py-3 text-center font-bold text-primary"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-primary py-3 text-center font-bold text-white"
                  onClick={() => setOpen(false)}
                >
                  Join Us
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
