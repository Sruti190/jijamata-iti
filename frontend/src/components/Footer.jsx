import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white mt-20" data-testid="footer">
      <div className="container-x py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src="https://customer-assets.emergentagent.com/job_iti-admissions-hub/artifacts/imnrlgx5_Logo1.png"
              alt="Shri Marutrao Ghule Patil Shikshan Sanstha"
              className="w-16 h-16 object-contain bg-white rounded-full p-1"
            />
            <div>
              <div className="font-serif text-xl font-semibold">Jijamata Private ITI</div>
              <div className="text-xs text-slate-300">Bhenda · Estd. 1984 · ITI Code PR27000096</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-slate-300 max-w-md">
            A government-recognised Industrial Training Institute under Shri. Marutrao Ghule Patil
            Education Institute, shaping skilled professionals for industry since 1984.
          </p>
          <p className="mt-4 italic text-sm text-slate-400">
            "Loknete Marutrao Ghule Patil in the hearts of the people."
          </p>
        </div>
        <div>
          <div className="font-serif font-semibold mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
            <li><Link to="/admissions" className="hover:text-white">Admissions</Link></li>
            <li><Link to="/apply" className="hover:text-white">Enquiry</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-serif font-semibold mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-3"><i className="fa-solid fa-location-dot mt-1 text-[var(--gold)]" /><span>Ap- Bhende (Dnyaneshwarnagar), Tal- Newasa, Dist- Ahmednagar, MH 414605</span></li>
            <li className="flex gap-3"><i className="fa-solid fa-phone mt-1 text-[var(--gold)]" /><span>02427-255376</span></li>
            <li className="flex gap-3"><i className="fa-solid fa-envelope mt-1 text-[var(--gold)]" /><span>Jijamata_Iti@Yahoo.Com</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-slate-400 flex flex-col md:flex-row justify-between gap-2">
          <div>© {new Date().getFullYear()} Jijamata Private Industrial Training Institute. All rights reserved.</div>
          <div>Designed for academic excellence.</div>
        </div>
      </div>
    </footer>
  );
}
