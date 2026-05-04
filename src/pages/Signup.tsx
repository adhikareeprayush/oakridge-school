import { Link, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { dashboardPathForRole } from "../auth/dashboardPaths";
import { useMockAuth } from "../hooks/useMockAuth";
import { SITE_NAME } from "../constants/site";
import { LogoMark } from "../components/Logo";
import type { UserRole } from "../types/models";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useMockAuth();
  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      name: name.trim() || "New member",
      email: email.trim() || "member@example.com",
      role,
    });
    navigate(dashboardPathForRole(role));
  };

  return (
    <section className="min-h-[72vh] bg-lightGray py-16">
      <div className="page-container flex justify-center">
        <div className="w-full max-w-md rounded-2xl border border-lightGray2 bg-white p-8 accentuedDropShadow">
          <div className="mb-6 text-center">
            <Link
              to="/"
              className="mb-4 inline-flex justify-center transition hover:opacity-90"
              aria-label={`${SITE_NAME} home`}
            >
              <LogoMark size="lg" decorative />
            </Link>
            <h2 className="text-3xl font-extrabold text-text">Create your account</h2>
            <p className="mt-2 text-secondText">Join {SITE_NAME} and start learning today</p>
          </div>

          <div className="mb-6">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-lightGray2 py-2.5 text-sm font-semibold hover:bg-lightGray"
            >
              <FaGoogle /> Sign up with Google
            </button>
          </div>

          <div className="mb-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-lightGray2" />
            <span className="text-sm text-secondText">or</span>
            <span className="h-px flex-1 bg-lightGray2" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-secondText">
                I am signing up as
              </span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full rounded-lg border border-lightGray2 px-3 py-3 text-sm font-semibold outline-none ring-primary focus:ring-2"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Org admin</option>
              </select>
            </label>

            <label className="block">
              <div className="flex items-center gap-2 rounded-lg border border-lightGray2 p-3">
                <FiUser className="text-muted" aria-hidden />
                <input
                  className="w-full outline-none"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            </label>

            <label className="block">
              <div className="flex items-center gap-2 rounded-lg border border-lightGray2 p-3">
                <FiMail className="text-muted" aria-hidden />
                <input
                  className="w-full outline-none"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </label>

            <label className="block">
              <div className="flex items-center gap-2 rounded-lg border border-lightGray2 p-3">
                <FiLock className="text-muted" aria-hidden />
                <input
                  className="w-full outline-none"
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </div>
            </label>

            <label className="block">
              <div className="flex items-center gap-2 rounded-lg border border-lightGray2 p-3">
                <FiLock className="text-muted" aria-hidden />
                <input
                  className="w-full outline-none"
                  placeholder="Confirm password"
                  type="password"
                  autoComplete="new-password"
                />
              </div>
            </label>

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" required className="mt-1" />
              <span className="text-secondText">
                I agree to the{" "}
                <Link to="/pricing" className="font-semibold text-primary">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/contact" className="font-semibold text-primary">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white hover:opacity-90"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-secondText">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
