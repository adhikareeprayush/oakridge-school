import { Link, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { dashboardPathForRole } from "../auth/dashboardPaths";
import { useMockAuth } from "../hooks/useMockAuth";
import { SITE_NAME } from "../constants/site";
import { LogoMark } from "../components/Logo";
import type { UserRole } from "../types/models";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useMockAuth();
  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("alex@example.com");
  const [name, setName] = useState("Alex Learner");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      name: name.trim() || "Alex Learner",
      email: email.trim() || "alex@example.com",
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
            <h2 className="text-3xl font-extrabold text-text">Welcome back</h2>
            <p className="mt-2 text-secondText">Sign in to continue to {SITE_NAME}</p>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-lightGray2 py-2.5 text-xs font-semibold text-text hover:bg-lightGray"
            >
              <FaGoogle /> Google
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-lightGray2 py-2.5 text-xs font-semibold text-text hover:bg-lightGray"
            >
              <FaFacebookF /> Facebook
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
                Demo role
              </span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full rounded-lg border border-lightGray2 bg-white px-3 py-3 text-sm font-semibold text-text outline-none ring-primary focus:ring-2"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
              <p className="mt-1 text-xs text-secondText">
                Routes to the matching dashboard; swap for OAuth payload roles later.
              </p>
            </label>

            <label className="block">
              <span className="sr-only">Display name</span>
              <div className="flex items-center gap-2 rounded-lg border border-lightGray2 p-3">
                <input
                  className="w-full outline-none"
                  placeholder="Display name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </label>

            <label className="block">
              <span className="sr-only">Email</span>
              <div className="flex items-center gap-2 rounded-lg border border-lightGray2 p-3">
                <FiMail className="text-muted" aria-hidden />
                <input
                  className="w-full outline-none"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </label>

            <label className="block">
              <span className="sr-only">Password</span>
              <div className="flex items-center gap-2 rounded-lg border border-lightGray2 p-3">
                <FiLock className="text-muted" aria-hidden />
                <input
                  className="w-full outline-none"
                  placeholder="Password (visual only)"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-secondText">Remember me</span>
              </label>
              <Link to="/contact" className="font-semibold text-primary">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-secondText">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
