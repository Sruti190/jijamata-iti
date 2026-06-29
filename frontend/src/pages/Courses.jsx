import { Link } from "react-router-dom";
import { COURSES } from "../lib/api";

export default function Courses() {
  return (
    <div data-testid="courses-page">
      <section className="bg-white border-b hairline">
        <div className="container-x section-pad">
          <span className="eyebrow">Industrial Training Programmes</span>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mt-3 text-[var(--ink)]">Eight trades. One disciplined path to a career.</h1>
          <p className="mt-5 max-w-3xl text-slate-600 text-lg">
            Each trade follows the National Council for Vocational Training (NCVT) curriculum with a
            balance of classroom theory and supervised workshop practice. Choose a trade aligned with
            your aptitude and ambitions.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid md:grid-cols-2 gap-6">
          {COURSES.map((c) => (
            <div key={c.name} className="card-academic p-7" data-testid={`courses-page-${c.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-lg bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center text-xl">
                  <i className={`fa-solid ${c.icon}`} />
                </div>
                <div className="flex-1">
                  <div className="font-serif font-semibold text-2xl text-[var(--ink)]">{c.name}</div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="chip"><i className="fa-regular fa-clock" /> {c.duration}</span>
                    <span className="chip"><i className="fa-solid fa-chair" /> {c.seats} seats</span>
                  </div>
                  <p className="mt-4 text-slate-600 text-sm">{c.desc}</p>
                  <Link to={`/apply?course=${encodeURIComponent(c.name)}`} className="mt-5 inline-flex items-center gap-2 text-[var(--brand)] font-semibold text-sm hover:underline">
                    Apply for {c.name} <i className="fa-solid fa-arrow-right text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
