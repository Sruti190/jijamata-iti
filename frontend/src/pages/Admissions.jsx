import { Link } from "react-router-dom";

const STEPS = [
  { n: "01", t: "Submit application", d: "Fill the online application form with your personal and academic details." },
  { n: "02", t: "Document verification", d: "Carry originals and self-attested copies of all required certificates." },
  { n: "03", t: "Seat allotment", d: "Allotment is per Maharashtra DGT merit list and reservation guidelines." },
  { n: "04", t: "Fee payment & enrolment", d: "Pay institute fees and complete enrolment within the stipulated time." },
];

const DATES = [
  { d: "Mar 01, 2026", e: "Online applications open" },
  { d: "May 30, 2026", e: "Last date to apply" },
  { d: "Jun 10, 2026", e: "Merit list published" },
  { d: "Jun 20, 2026", e: "Document verification" },
  { d: "Jul 01, 2026", e: "Academic year begins" },
];

const DOCS = [
  "10th Marksheet (mandatory)",
  "12th Marksheet (optional, if applicable)",
  "School Leaving Certificate (TC)",
  "Application printout — online registration form",
  "Seat Allotment Letter (from DGT portal)",
  "Aadhaar Card — photo identity & address proof",
  "Recent passport-size photographs",
  "Domicile Certificate (Maharashtra)",
  "Caste Certificate — SC/ST/OBC/VJ-NT/SBC (if claiming reservation)",
  "Non-Creamy Layer Certificate — OBC/VJ-NT/SBC (current FY)",
  "Income Certificate — for fee waivers / scholarships",
  "Disability Certificate — for PWD quota (if applicable)",
  "Additional weightage certificates — Drawing, Sports, Orphanage (if applicable)",
];

export default function Admissions() {
  return (
    <div data-testid="admissions-page">
      <section className="bg-white border-b hairline">
        <div className="container-x section-pad">
          <span className="eyebrow">Admissions 2026-27</span>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mt-3 text-[var(--ink)]">A structured path to skilled employment.</h1>
          <p className="mt-5 max-w-3xl text-slate-600 text-lg">
            Admissions follow Maharashtra DGT centralised allotment as well as institute-level intake.
            Read the process, prepare your documents, and apply online.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/apply" className="btn-primary" data-testid="admissions-apply">Start Application <i className="fa-solid fa-arrow-right text-sm" /></Link>
            <a href="#documents" className="btn-ghost"><i className="fa-solid fa-list-check" /> Document Checklist</a>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <span className="eyebrow">Process</span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl mt-3 text-[var(--ink)]">Four steps to enrolment</h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s) => (
              <div key={s.n} className="card-academic p-6" data-testid={`step-${s.n}`}>
                <div className="font-serif text-4xl font-bold text-[var(--brand)]">{s.n}</div>
                <div className="font-serif font-semibold text-lg mt-3 text-[var(--ink)]">{s.t}</div>
                <p className="text-sm text-slate-600 mt-2">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)] border-y hairline">
        <div className="container-x section-pad grid lg:grid-cols-2 gap-12">
          <div>
            <span className="eyebrow">Important Dates</span>
            <h2 className="font-serif font-bold text-3xl mt-3 text-[var(--ink)]">Key milestones</h2>
            <div className="mt-8 bg-white border hairline rounded-lg overflow-hidden">
              {DATES.map((d, i) => (
                <div key={i} className={`flex justify-between gap-6 p-5 ${i ? "border-t hairline" : ""}`} data-testid={`date-${i}`}>
                  <div className="text-sm font-semibold text-[var(--brand)]">{d.d}</div>
                  <div className="text-sm text-slate-700 text-right">{d.e}</div>
                </div>
              ))}
            </div>
          </div>
          <div id="documents">
            <span className="eyebrow">Document Checklist</span>
            <h2 className="font-serif font-bold text-3xl mt-3 text-[var(--ink)]">What to bring</h2>
            <ul className="mt-8 bg-white border hairline rounded-lg divide-y hairline">
              {DOCS.map((d, i) => (
                <li key={i} className="flex gap-4 p-4 text-sm" data-testid={`doc-${i}`}>
                  <i className="fa-solid fa-circle-check text-[var(--brand)] mt-0.5" />
                  <span className="text-slate-700">{d}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 mt-4">Submit self-attested photocopies and carry originals for verification.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
