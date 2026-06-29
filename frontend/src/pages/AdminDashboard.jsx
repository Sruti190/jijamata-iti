import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import client, { auth, COURSES, API, STATUSES } from "../lib/api";

export default function AdminDashboard() {
  const nav = useNavigate();
  const [apps, setApps] = useState([]);
  const [stats, setStats] = useState({ total: 0, byStatus: {}, byCourse: {} });
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!auth.get()) nav("/admin/login");
  }, [nav]);

  const load = async () => {
    setBusy(true);
    try {
      const q = new URLSearchParams();
      if (course) q.set("course", course);
      if (status) q.set("status", status);
      const [a, s] = await Promise.all([
        client.get(`/admin/applications?${q.toString()}`),
        client.get(`/admin/stats`),
      ]);
      setApps(a.data.applications);
      setStats(s.data);
    } catch (err) {
      if (err?.response?.status === 401) { auth.clear(); nav("/admin/login"); }
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [course, status]);

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    if (!s) return apps;
    return apps.filter((a) =>
      [a.fullName, a.email, a.phone, a.applicationId, a.course]
        .filter(Boolean).join(" ").toLowerCase().includes(s)
    );
  }, [apps, search]);

  const changeStatus = async (id, newStatus) => {
    try {
      await client.patch(`/admin/applications/${id}`, { status: newStatus });
      setApps((prev) => prev.map((a) => (a.applicationId === id ? { ...a, status: newStatus } : a)));
      if (selected?.applicationId === id) setSelected({ ...selected, status: newStatus });
    } catch (err) {
      alert(err?.response?.data?.detail || "Update failed");
    }
  };

  const downloadCsv = async () => {
    const res = await fetch(`${API}/admin/applications/csv`, {
      headers: { Authorization: `Bearer ${auth.get()}` },
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "jijamata_applications.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const logout = () => { auth.clear(); nav("/admin/login"); };

  return (
    <div className="container-x py-10" data-testid="admin-dashboard">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <span className="eyebrow">Admissions</span>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mt-2 text-[var(--ink)]">Admin Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={downloadCsv} className="btn-ghost" data-testid="btn-csv"><i className="fa-solid fa-file-csv" /> Export CSV</button>
          <button onClick={logout} className="btn-primary" data-testid="btn-logout"><i className="fa-solid fa-right-from-bracket" /> Logout</button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total" value={stats.total} accent="brand" icon="fa-inbox" />
        {STATUSES.map((s) => (
          <StatCard key={s} label={s} value={stats.byStatus?.[s] || 0} accent={s.toLowerCase()} icon={
            s === "New" ? "fa-circle-dot" : s === "Contacted" ? "fa-phone" : s === "Approved" ? "fa-circle-check" : "fa-circle-xmark"
          } />
        ))}
      </div>

      {/* FILTERS */}
      <div className="card-academic p-5 mb-6 grid md:grid-cols-4 gap-4" data-testid="filters">
        <select className="input-academic" value={course} onChange={(e) => setCourse(e.target.value)} data-testid="filter-course">
          <option value="">All trades</option>
          {COURSES.map((c) => <option key={c.name}>{c.name}</option>)}
        </select>
        <select className="input-academic" value={status} onChange={(e) => setStatus(e.target.value)} data-testid="filter-status">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <input className="input-academic md:col-span-2" placeholder="Search by name, email, phone, app id..." value={search} onChange={(e) => setSearch(e.target.value)} data-testid="filter-search" />
      </div>

      {/* TABLE */}
      <div className="card-academic overflow-hidden" data-testid="applications-table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--paper)] text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="p-4">App ID</th>
                <th className="p-4">Applicant</th>
                <th className="p-4">Trade</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Submitted</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y hairline">
              {busy && (
                <tr><td colSpan={7} className="p-10 text-center text-slate-500"><i className="fa-solid fa-spinner fa-spin mr-2" />Loading...</td></tr>
              )}
              {!busy && filtered.length === 0 && (
                <tr><td colSpan={7} className="p-10 text-center text-slate-500">No applications found.</td></tr>
              )}
              {!busy && filtered.map((a) => (
                <tr key={a.applicationId} className="hover:bg-[var(--paper)]" data-testid={`app-row-${a.applicationId}`}>
                  <td className="p-4 font-mono text-xs">{a.applicationId}</td>
                  <td className="p-4">
                    <div className="font-medium text-[var(--ink)]">{a.fullName}</div>
                    <div className="text-xs text-slate-500">{a.email}</div>
                  </td>
                  <td className="p-4">{a.course}</td>
                  <td className="p-4">{a.phone}</td>
                  <td className="p-4 text-xs text-slate-600">{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <select
                      className={`text-xs font-semibold rounded-full px-3 py-1 border-0 status-${a.status} cursor-pointer`}
                      value={a.status}
                      onChange={(e) => changeStatus(a.applicationId, e.target.value)}
                      data-testid={`status-${a.applicationId}`}
                    >
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => setSelected(a)} className="text-[var(--brand)] font-semibold text-xs hover:underline" data-testid={`view-${a.applicationId}`}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelected(null)} data-testid="detail-modal">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b hairline">
              <div>
                <div className="font-serif font-bold text-2xl text-[var(--ink)]">{selected.fullName}</div>
                <div className="text-xs text-slate-500 mt-1 font-mono">{selected.applicationId}</div>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-slate-100 rounded" data-testid="modal-close"><i className="fa-solid fa-xmark" /></button>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-4 text-sm">
              {[
                ["Email", selected.email], ["Phone", selected.phone], ["DOB", selected.dob],
                ["Course", selected.course], ["Gender", selected.gender], ["Category", selected.category],
                ["Father's Name", selected.fatherName], ["Mother's Name", selected.motherName],
                ["Qualification", selected.qualification],
                ["Year", selected.qualificationYear], ["Marks", selected.qualificationMarks],
                ["Status", selected.status],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs uppercase tracking-wider text-slate-500">{k}</div>
                  <div className="text-[var(--ink)] mt-1">{v || "—"}</div>
                </div>
              ))}
              {selected.address && (
                <div className="md:col-span-2">
                  <div className="text-xs uppercase tracking-wider text-slate-500">Address</div>
                  <div className="text-[var(--ink)] mt-1">{selected.address}</div>
                </div>
              )}
              {selected.notes && (
                <div className="md:col-span-2">
                  <div className="text-xs uppercase tracking-wider text-slate-500">Notes</div>
                  <div className="text-[var(--ink)] mt-1">{selected.notes}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="card-academic p-5">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-[10px]">{label}</span>
        <i className={`fa-solid ${icon} text-[var(--brand)]`} />
      </div>
      <div className="font-serif font-bold text-3xl text-[var(--ink)] mt-2">{value}</div>
    </div>
  );
}
