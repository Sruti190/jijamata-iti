import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import client, { COURSES } from "../lib/api";

const INITIAL = {
  fullName: "", email: "", phone: "", dob: "", course: "",
  address: "", gender: "", category: "",
  fatherName: "", motherName: "",
  qualification: "", qualificationYear: "", qualificationMarks: "", notes: "",
};

export default function Apply() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ ...INITIAL, course: params.get("course") || "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const c = params.get("course");
    if (c) setForm((f) => ({ ...f, course: c }));
  }, [params]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.fullName|| !form.phone || !form.dob || !form.course) {
      setError("Please fill all required fields.");
      return;
    }
    setBusy(true);
    try {
      const { data } = await client.post("/applications", form);
      setSuccess(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err?.response?.data?.detail || "Submission failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (success) {
    return (
      <div className="section-pad container-x" data-testid="apply-success">
        <div className="card-academic max-w-2xl mx-auto p-10 text-center fade-up">
          <div className="w-16 h-16 rounded-full bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center mx-auto text-3xl">
            <i className="fa-solid fa-check" />
          </div>
          <h1 className="font-serif font-bold text-3xl mt-5 text-[var(--ink)]">Enquiry Received</h1>
          <p className="text-slate-600 mt-3">
            Thank you for your interest in Jijamata Private ITI, Bhenda. Final admissions happen through the
            Maharashtra <b>RCAP</b> round — our faculty will contact you soon to guide you through it.
          </p>
          <div className="mt-7 inline-flex items-center gap-3 bg-[var(--brand-tint)] text-[var(--brand)] px-5 py-3 rounded-md font-semibold">
            <i className="fa-solid fa-id-card" />
            Application ID: <span data-testid="success-app-id">{success.applicationId}</span>
          </div>
         <p className="text-xs text-slate-500 mt-5">Our admissions team will call you on <b>{form.phone}</b> shortly.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-ghost">Back to home</Link>
            <Link to="/courses" className="btn-primary">Explore other trades <i className="fa-solid fa-arrow-right text-sm" /></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="apply-page">
      <section className="bg-white border-b hairline">
        <div className="container-x py-12">
          <span className="eyebrow">Online Application</span>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mt-3 text-[var(--ink)]">Admission Enquiry</h1>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Final admissions are conducted through the Maharashtra <b>RCAP</b> (Regional Centralised
            Admission Process) round. This form is only an <b>enquiry / pre-registration</b> — our
            faculty will contact you with guidance on the RCAP process. Fields marked * are required.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x max-w-4xl">
          <form onSubmit={submit} className="card-academic p-8 md:p-10 space-y-8" data-testid="apply-form">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm" data-testid="apply-error">
                <i className="fa-solid fa-circle-exclamation mr-2" />{error}
              </div>
            )}

            <Section title="Personal Details">
              <Field label="Full Name *"><input className="input-academic" value={form.fullName} onChange={set("fullName")} required data-testid="field-fullName" /></Field>
              <Field label="Email (optional)"><input type="email" className="input-academic" value={form.email} onChange={set("email")} required data-testid="field-email" /></Field>
              <Field label="Phone *"><input className="input-academic" value={form.phone} onChange={set("phone")} required data-testid="field-phone" /></Field>
              <Field label="Date of Birth *"><input type="date" className="input-academic" value={form.dob} onChange={set("dob")} required data-testid="field-dob" /></Field>
              <Field label="Gender">
                <select className="input-academic" value={form.gender} onChange={set("gender")} data-testid="field-gender">
                  <option value="">Select</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </Field>
              <Field label="Category">
                <select className="input-academic" value={form.category} onChange={set("category")} data-testid="field-category">
                  <option value="">Select</option>
                  <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>VJ/NT</option><option>SBC</option><option>EWS</option>
                </select>
              </Field>
              <Field label="Father's Name"><input className="input-academic" value={form.fatherName} onChange={set("fatherName")} data-testid="field-fatherName" /></Field>
              <Field label="Mother's Name"><input className="input-academic" value={form.motherName} onChange={set("motherName")} data-testid="field-motherName" /></Field>
              <Field label="Address" full>
                <textarea rows={3} className="input-academic" value={form.address} onChange={set("address")} data-testid="field-address" />
              </Field>
            </Section>

            <Section title="Course Selection">
              <Field label="Trade / Course *" full>
                <select className="input-academic" value={form.course} onChange={set("course")} required data-testid="field-course">
                  <option value="">Select a trade</option>
                  {COURSES.map((c) => <option key={c.name} value={c.name}>{c.name} ({c.duration})</option>)}
                </select>
              </Field>
            </Section>

            <Section title="Previous Qualification">
              <Field label="Last Qualification">
                <select className="input-academic" value={form.qualification} onChange={set("qualification")} data-testid="field-qualification">
                  <option value="">Select</option>
                  <option>8th Pass</option><option>10th Pass</option><option>12th Pass</option><option>Other</option>
                </select>
              </Field>
              <Field label="Year of Passing"><input className="input-academic" value={form.qualificationYear} onChange={set("qualificationYear")} data-testid="field-qualYear" /></Field>
              <Field label="Marks / Percentage"><input className="input-academic" value={form.qualificationMarks} onChange={set("qualificationMarks")} data-testid="field-qualMarks" /></Field>
              <Field label="Notes (optional)" full>
                <textarea rows={3} className="input-academic" value={form.notes} onChange={set("notes")} data-testid="field-notes" />
              </Field>
            </Section>

            <div className="bg-[var(--brand-tint)] border border-[var(--brand)]/15 rounded-md p-4 text-xs text-[var(--brand)]">
              <i className="fa-solid fa-circle-info mr-2" />
              Document uploads (10th/12th marksheet, Aadhaar, photos, TC, etc.) will be collected during document verification at the institute.
            </div>

            <div className="flex flex-wrap items-center gap-3 justify-end pt-4 border-t hairline">
              <Link to="/" className="btn-ghost">Cancel</Link>
              <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60" data-testid="apply-submit">
                {busy ? (<><i className="fa-solid fa-spinner fa-spin" /> Submitting...</>) : (<>Submit Enquiry <i className="fa-solid fa-arrow-right text-sm" /></>)}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="font-serif font-semibold text-xl text-[var(--ink)] mb-5 pb-2 border-b hairline">{title}</h3>
      <div className="grid md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}
function Field({ label, children, full }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">{label}</div>
      {children}
    </label>
  );
}
