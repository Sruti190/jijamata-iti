import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client, { auth } from "../lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { data } = await client.post("/admin/login", { username, password });
      auth.set(data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.response?.data?.detail || "Invalid credentials");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="section-pad container-x" data-testid="admin-login-page">
      <div className="max-w-md mx-auto card-academic p-10">
        <div className="w-14 h-14 rounded-md bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center text-xl">
          <i className="fa-solid fa-shield-halved" />
        </div>
        <h1 className="font-serif font-bold text-3xl mt-5 text-[var(--ink)]">Admin Login</h1>
        <p className="text-sm text-slate-600 mt-1">Jijamata ITI · Admissions Dashboard</p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm" data-testid="login-error">
              <i className="fa-solid fa-circle-exclamation mr-2" />{error}
            </div>
          )}
          <label className="block">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Username</div>
            <input className="input-academic" value={username} onChange={(e) => setU(e.target.value)} required data-testid="login-username" />
          </label>
          <label className="block">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Password</div>
            <input type="password" className="input-academic" value={password} onChange={(e) => setP(e.target.value)} required data-testid="login-password" />
          </label>
          <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60" data-testid="login-submit">
            {busy ? (<><i className="fa-solid fa-spinner fa-spin" /> Signing in...</>) : (<>Sign in <i className="fa-solid fa-arrow-right text-sm" /></>)}
          </button>
          <div className="text-xs text-slate-500 text-center pt-2">Default credentials: <code>admin</code> / <code>admin123</code></div>
        </form>
      </div>
    </div>
  );
}
