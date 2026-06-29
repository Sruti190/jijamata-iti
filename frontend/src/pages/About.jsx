export default function About() {
  return (
    <div data-testid="about-page">
      <section className="bg-white border-b hairline">
        <div className="container-x section-pad">
          <span className="eyebrow">About the institute</span>
          <h1 className="font-serif font-bold text-4xl md:text-5xl mt-3 text-[var(--ink)]">A 31-year legacy of skilled training.</h1>
          <p className="mt-5 max-w-3xl text-slate-600 text-lg">
            Jijamata Private Industrial Training Institute, Bhenda, was established on 1 July 1984 by
            Loknete Marutrao Ghule Patil under the Shri. Marutrao Ghule Patil Education Institute.
            Today it stands as a government-recognised centre of vocational excellence in the
            Ahmednagar district of Maharashtra.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid md:grid-cols-2 gap-10">
          <div className="card-academic p-8">
            <i className="fa-solid fa-bullseye text-[var(--brand)] text-2xl" />
            <h2 className="font-serif font-semibold text-2xl mt-4 text-[var(--ink)]">Our Mission</h2>
            <p className="mt-3 text-slate-600">
              To bridge the gap between academic learning and industry requirements by imparting
              hands-on training, modern technical knowledge and practical skills. We nurture skilled
              professionals who contribute effectively to the workforce and the industrial growth of
              the nation.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              {["Deliver quality technical education and practical training.",
                "Develop skilled, confident and responsible professionals.",
                "Foster an environment of learning, innovation and growth.",
                "Align curriculum with current industry standards."].map((m) => (
                <li key={m} className="flex gap-3"><i className="fa-solid fa-check text-[var(--brand)] mt-1" /><span>{m}</span></li>
              ))}
            </ul>
          </div>
          <div className="card-academic p-8">
            <i className="fa-solid fa-eye text-[var(--brand)] text-2xl" />
            <h2 className="font-serif font-semibold text-2xl mt-4 text-[var(--ink)]">Our Vision</h2>
            <p className="mt-3 text-slate-600">
              To become a centre of excellence in vocational training — providing skill-based education
              that meets the demands of today's industries and contributes to the development of
              society at large.
            </p>
            <div className="mt-6 pt-5 border-t hairline">
              <div className="text-sm font-serif italic text-slate-700">
                "Together, let's cultivate a learning environment that is impactful, innovative and
                inclusive."
              </div>
              <div className="text-xs text-slate-500 mt-2 uppercase tracking-wider">— Hon. Dr. Narendra Ghule Patil</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)] border-y hairline">
        <div className="container-x section-pad">
          <span className="eyebrow">Why choose us</span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl mt-3 text-[var(--ink)]">Five reasons families trust Jijamata ITI</h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { i: "fa-shield-halved", t: "Government Recognised", d: "Approved under ITI code PR27000096 — structured, certified curriculum." },
              { i: "fa-flask-vial", t: "Quality Training", d: "Balanced theory and practical applications to deliver industry-relevant skills." },
              { i: "fa-chalkboard-user", t: "Experienced Faculty", d: "Skilled instructors dedicated to guiding students toward technical excellence." },
              { i: "fa-screwdriver-wrench", t: "Equipped Infrastructure", d: "Modern labs and workshops with state-of-the-art equipment for hands-on learning." },
              { i: "fa-briefcase", t: "Career-Oriented", d: "Training ensures students are job-ready for industry opportunities." },
              { i: "fa-people-group", t: "Inclusive Community", d: "A nurturing environment built on academic discipline and social responsibility." },
            ].map((f) => (
              <div key={f.t} className="card-academic p-6">
                <i className={`fa-solid ${f.i} text-[var(--brand)] text-xl`} />
                <div className="font-serif font-semibold text-lg mt-3 text-[var(--ink)]">{f.t}</div>
                <p className="text-sm text-slate-600 mt-2">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid lg:grid-cols-3 gap-6">
          <Info label="Established" value="1 July 1984" icon="fa-calendar" />
          <Info label="ITI Code" value="PR27000096" icon="fa-id-card" />
          <Info label="Location" value="Bhende, Newasa, Ahmednagar — Maharashtra" icon="fa-location-dot" />
        </div>
      </section>
    </div>
  );
}

function Info({ label, value, icon }) {
  return (
    <div className="card-academic p-6 flex items-start gap-4">
      <i className={`fa-solid ${icon} text-[var(--brand)] text-xl mt-1`} />
      <div>
        <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
        <div className="font-serif font-semibold text-[var(--ink)] mt-1">{value}</div>
      </div>
    </div>
  );
}
