import { Link } from "react-router-dom";
import { COURSES } from "../lib/api";

const NOTICES = [
  { date: "Feb 12, 2026", text: "Admissions OPEN for the 2026-27 academic year — Apply online today.", tag: "Admission" },
  { date: "Feb 05, 2026", text: "Industry visit: Electrician trade students visited the MSEB sub-station.", tag: "Activity" },
  { date: "Jan 22, 2026", text: "Annual gathering 'Pragati 2026' scheduled for March 10.", tag: "Event" },
];

const HERO_IMG =
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1920&q=70";

export default function Home() {
  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden" data-testid="hero">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-[var(--brand)]" style={{ opacity: 0.92 }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand)] via-[var(--brand)]/95 to-[var(--brand)]/70" />

        <div className="container-x relative py-20 md:py-28 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 text-white fade-up">
            <span className="inline-block bg-[var(--gold)] text-[var(--ink)] font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded-md">
              Government Recognized · ITI Code PR27000096
            </span>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl mt-6 leading-[1.05]">
              Jijamata Private<br/>
              Industrial Training<br/>
              Institute
            </h1>
            <div className="mt-6 text-base md:text-lg text-white/90">
              Bhenda, Tal. Newasa, Dist. Ahmednagar
            </div>
            <p className="mt-3 italic text-sm md:text-base text-white/80 max-w-xl">
              "Loknete Marutrao Ghule Patil in the hearts of the people" — <span className="not-italic font-medium text-white/85">The Life Philosophy of Loknete Marutrao Ghule Patil.</span>
            </p>
            <p className="mt-6 text-sm md:text-base text-white/85 max-w-xl">
              Empowering students with industry-ready technical skills since 1984. 8 NCVT-aligned trades, expert faculty, modern workshops.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/apply" className="bg-[var(--gold)] hover:bg-[#e6a82c] text-[var(--ink)] font-semibold px-7 py-3.5 rounded-md inline-flex items-center gap-2 transition-colors shadow-lg" data-testid="hero-apply-btn">
                Apply Now <i className="fa-solid fa-arrow-right text-sm" />
              </Link>
              <Link to="/courses" className="border-2 border-white/90 text-white hover:bg-white hover:text-[var(--brand)] font-semibold px-7 py-3.5 rounded-md inline-flex items-center gap-2 transition-colors" data-testid="hero-courses-btn">
                Explore Courses
              </Link>
            </div>
          </div>

          {/* Glass President's card */}
          <div className="lg:col-span-5 fade-up delay-2">
            <div className="rounded-xl border border-white/25 bg-white/10 backdrop-blur-xl p-7 text-white shadow-2xl">
              <div className="flex items-center gap-3 text-[var(--gold)] font-semibold">
                <i className="fa-solid fa-quote-left text-2xl" />
                <span className="uppercase tracking-wider text-xs">Honorable President's Message</span>
              </div>
              <p className="mt-5 text-sm md:text-base leading-relaxed text-white/95">
                Welcome and congratulations to all of you. Loknete Marutrao Ghule Patil has established
                Jijamata ITI College with the aim of fostering an environment of academic excellence,
                innovation, and social responsibility. This college has steadfastly adhered to these
                principles since the past 31 years…
              </p>
              <div className="mt-6 pt-5 border-t border-white/20 text-sm">
                — <span className="font-semibold">Hon. Dr. Narendra Ghule Patil</span>, President
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[var(--paper-2)] border-b hairline">
        <div className="container-x py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <Stat icon="fa-award" n="40+" l="Years of Excellence" />
          <Stat icon="fa-screwdriver-wrench" n="8" l="NCVT-Aligned Trades" />
          <Stat icon="fa-user-group" n="168" l="Total Annual Intake" />
          <Stat icon="fa-building-columns" n="1984" l="Established" />
        </div>
      </section>

      {/* NOTICES */}
      <section className="section-pad bg-[var(--paper)]">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="eyebrow">Stay informed</span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl mt-2 text-[var(--ink)]">Announcements &amp; Notices</h2>
            </div>
            <span className="chip"><i className="fa-solid fa-circle-dot text-[var(--gold)]" /> LIVE</span>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {NOTICES.map((n, i) => (
              <div key={i} className="card-academic p-6" data-testid={`notice-${i}`}>
                <div className="flex items-center gap-3">
                  <span className="chip">{n.tag}</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{n.date}</span>
                </div>
                <p className="mt-4 text-sm text-slate-700 leading-relaxed">{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SNAPSHOT */}
      <section className="section-pad">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="eyebrow">Trade-wise training</span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl mt-2 text-[var(--ink)]">Our Eight Industrial Trades</h2>
            </div>
            <Link to="/courses" className="text-[var(--brand)] font-semibold text-sm hover:underline" data-testid="home-view-all-courses">
              View all trades <i className="fa-solid fa-arrow-right text-xs ml-1" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COURSES.map((c, i) => (
              <Link key={c.name} to={`/apply?course=${encodeURIComponent(c.name)}`} className={`group relative rounded-xl overflow-hidden border hairline shadow-sm hover:shadow-2xl transition-shadow fade-up delay-${(i % 3) + 1} block`} style={{ minHeight: "300px" }} data-testid={`course-card-${c.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/65 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand)] to-[var(--gold)]" />
                <div className="relative h-full p-6 flex flex-col justify-end text-white">
                  <div className="w-11 h-11 rounded-lg bg-[var(--gold)] text-[var(--ink)] flex items-center justify-center text-lg mb-3 shadow-lg">
                    <i className={`fa-solid ${c.icon}`} />
                  </div>
                  <div className="font-serif font-bold text-xl drop-shadow">{c.name}</div>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/15 backdrop-blur-sm text-white px-2 py-0.5 rounded border border-white/20">{c.duration}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-[var(--gold)]/95 text-[var(--ink)] px-2 py-0.5 rounded">{c.seats} Seats</span>
                  </div>
                  <p className="text-xs text-white/90 mt-3 line-clamp-2 leading-relaxed">{c.desc}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[var(--gold)] text-sm font-bold group-hover:gap-2.5 transition-all">
                    Apply for this trade <i className="fa-solid fa-arrow-right text-xs" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SCHOLARSHIPS / FEES */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand)] to-[var(--ink)]" />
        <div className="container-x relative text-white grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[var(--gold)] uppercase tracking-[0.18em] text-xs font-semibold">Scholarships & Fees</span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl mt-3">Up to 80% fee reimbursement for EBC students.</h2>
            <p className="mt-5 text-white/85 leading-relaxed">
              Eligible <b>Economically Backward Class (EBC)</b> students pursuing an ITI course can receive up to
              <b className="text-[var(--gold)]"> 80% of their tuition and examination fees</b> reimbursed or
              waived. These benefits are disbursed through <b>Central &amp; State Government Direct Benefit
              Transfer (DBT) schemes</b>.
            </p>
            <ul className="mt-7 space-y-3 text-sm" data-testid="scholarship-list">
              {[
                "Maharashtra State EBC fee reimbursement (DBT)",
                "Post-Matric Scholarship for SC / ST / OBC / VJ-NT / SBC",
                "Minority community scholarship schemes",
                "Merit-based institute scholarship for top performers",
              ].map((s) => (
                <li key={s} className="flex gap-3 text-white/90">
                  <i className="fa-solid fa-circle-check text-[var(--gold)] mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <Link to="/admissions" className="mt-8 inline-flex items-center gap-2 bg-[var(--gold)] hover:bg-[#e6b748] text-[var(--ink)] font-semibold px-7 py-3.5 rounded-md transition-colors" data-testid="scholarship-cta">
              View admission steps <i className="fa-solid fa-arrow-right text-sm" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { i: "fa-percent", n: "100%", l: "Fee Reimbursement (EBC, eligible)" },
              { i: "fa-money-bill-transfer", n: "DBT", l: "Direct Benefit Transfer to bank" },
              { i: "fa-landmark", n: "Govt.", l: "Central & Maharashtra State schemes" },
              { i: "fa-award", n: "Merit", l: "Institute-level top performer awards" },
            ].map((c) => (
              <div key={c.l} className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-6">
                <i className={`fa-solid ${c.i} text-[var(--gold)] text-2xl`} />
                <div className="font-serif font-bold text-3xl mt-3">{c.n}</div>
                <div className="text-xs uppercase tracking-wider text-white/75 mt-1.5">{c.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLACEMENTS */}
      <section className="section-pad bg-gradient-to-b from-[var(--paper-2)] to-[var(--paper)]">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Placements & Industry</span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl mt-2 text-[var(--ink)]">Where our students build careers</h2>
            <p className="mt-4 text-slate-600">
              Graduates from Jijamata ITI are placed across leading manufacturing, automotive,
              electrical and engineering firms in Maharashtra and beyond.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="recruiters">
            {[
              { n: "Mahindra & Mahindra", i: "fa-car-side", s: "Automotive · Pune / Nashik" },
              { n: "Ather Energy", i: "fa-bolt-lightning", s: "EV manufacturing · Hosur" },
              { n: "NRB Bearings", i: "fa-circle-notch", s: "Precision bearings · Aurangabad" },
              { n: "Dhoot Transmission", i: "fa-gears", s: "Wiring harnesses · Aurangabad" },
            ].map((c) => (
              <div key={c.n} className="group relative bg-[var(--paper-2)] border hairline rounded-xl p-7 text-center overflow-hidden hover:-translate-y-1 transition-transform shadow-sm hover:shadow-xl" data-testid={`recruiter-${c.n.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[var(--brand)] via-[var(--gold)] to-[var(--brand)]" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] text-white flex items-center justify-center text-3xl shadow-lg mx-auto group-hover:scale-110 transition-transform">
                  <i className={`fa-solid ${c.i}`} />
                </div>
                <div className="font-serif font-bold text-lg text-[var(--ink)] mt-5 leading-tight">{c.n}</div>
                <div className="text-xs text-slate-500 mt-2 uppercase tracking-wider">{c.s}</div>
                <div className="mt-4 inline-block text-[10px] font-bold uppercase tracking-wider bg-[var(--gold)]/15 text-[var(--gold)] px-3 py-1.5 rounded-full">
                  <i className="fa-solid fa-briefcase mr-1" /> Recruiter
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            <PlaceStat icon="fa-handshake" n="4+" l="Industry Partners" />
            <PlaceStat icon="fa-user-check" n="80%+" l="Placement Rate" />
            <PlaceStat icon="fa-indian-rupee-sign" n="₹2-4L" l="Avg. Starting Package" />
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            * Representative list of recruiters and trainee opportunities in the region. Actual placement varies by trade, year and student performance.
          </p>
        </div>
      </section>

      {/* CTA + MAP */}
      <section className="section-pad bg-[var(--paper)] border-y hairline">
        <div className="container-x grid lg:grid-cols-2 gap-10 items-stretch">
          <div className="card-academic p-10 flex flex-col justify-center">
            <span className="eyebrow">Take the first step</span>
            <h3 className="font-serif font-bold text-3xl md:text-4xl mt-3 text-[var(--ink)]">Admissions open for 2026-27</h3>
            <p className="mt-4 text-slate-600">Submit your application online in under five minutes. Our faculty will contact you shortly to guide you through document verification and seat allotment.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/apply" className="bg-[var(--gold)] hover:bg-[#e6a82c] text-[var(--ink)] font-semibold px-7 py-3.5 rounded-md inline-flex items-center gap-2 transition-colors" data-testid="cta-apply">
                Apply now <i className="fa-solid fa-arrow-right text-sm" />
              </Link>
              <a href="tel:02427255376" className="btn-ghost"><i className="fa-solid fa-phone" /> 02427-255376</a>
            </div>
          </div>
          <div className="card-academic overflow-hidden" data-testid="campus-map">
            <iframe
              title="Jijamata ITI Bhenda map"
              src="https://www.google.com/maps?q=Bhende+Newasa+Ahmednagar+Maharashtra&output=embed"
              className="w-full h-80 lg:h-full min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, n, l }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center mx-auto text-xl">
        <i className={`fa-solid ${icon}`} />
      </div>
      <div className="font-serif font-bold text-3xl md:text-4xl text-[var(--ink)] mt-4">{n}</div>
      <div className="text-xs md:text-sm text-slate-500 uppercase tracking-wider mt-1">{l}</div>
    </div>
  );
}

function PlaceStat({ icon, n, l }) {
  return (
    <div className="card-academic p-7 text-center">
      <div className="w-12 h-12 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center mx-auto text-lg">
        <i className={`fa-solid ${icon}`} />
      </div>
      <div className="font-serif font-bold text-3xl text-[var(--ink)] mt-3">{n}</div>
      <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">{l}</div>
    </div>
  );
}
