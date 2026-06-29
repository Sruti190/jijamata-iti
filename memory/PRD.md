# Jijamata Private ITI College — Bhenda

## Original Problem Statement
Modern, responsive ITI college academic website (similar to MIT-WPU). Pages: Home, About, Courses, Admissions, Apply Now. Admin dashboard with JWT auth, status workflow, CSV export. Email notifications via Nodemailer (Gmail SMTP). MongoDB persistence. Blue/white academic theme, SEO + mobile-friendly.

## Stack Used (deviation from spec)
React + FastAPI + MongoDB (platform standard) instead of Next.js + Express. JWT via PyJWT, emails via Python smtplib (still Gmail SMTP).

## User Personas
- **Prospective student / parent**: browses trades, reads admissions process, submits application online.
- **Faculty / Admin**: logs in to dashboard, triages applications, updates status, exports CSV.

## Confirmed Inputs (from user)
- College name: **Jijamata Private Industrial Training Institute, Bhenda**
- Estd: 01-Jul-1984 · ITI Code PR27000096
- Address: Ap- Bhende (Dnyaneshwarnagar), Tal- Newasa, Dist- Ahmednagar, MH 414605
- Phone: 02427-255376 · Admin email: Jijamata_Iti@Yahoo.Com · Sender email: shrutilande758@gmail.com
- Taglines: "Loknete Marutrao Ghule Patil in the hearts of the people." / "The Life Philosophy of Loknete Marutrao Ghule Patil."
- President's message wired on Home page (Hon. Dr. Narendra Ghule Patil)
- Trades (8): Electrician, Fitter, Welder, COPA, Turner, Wireman, Electronics Mechanic, Painter General
- Admin auth: JWT, default credentials `admin / admin123`
- Document checklist (13 items) shown on Admissions page

## Implemented (Feb 2026)
### Backend (`/app/backend/server.py`)
- `GET /api/health`
- `POST /api/applications` (public) — validates required fields + trade, generates `JITI-XXXX-XXXX` ID, persists to Mongo `applications`, triggers student + admin emails (MOCKED until SMTP creds).
- `POST /api/admin/login` — JWT (HS256, 7-day exp)
- `GET /api/admin/applications` (auth) — supports `?course=` and `?status=` filters
- `GET /api/admin/stats` (auth) — total, byStatus, byCourse
- `PATCH /api/admin/applications/{id}` (auth) — status workflow (New/Contacted/Approved/Rejected)
- `GET /api/admin/applications/csv` (auth) — CSV export

### Frontend (`/app/frontend/src/`)
- Routes: `/`, `/about`, `/courses`, `/admissions`, `/apply`, `/admin/login`, `/admin/dashboard`
- Theme: blue/white academic, Fraunces (serif) + DM Sans, FontAwesome icons
- Components: Navbar (mobile-responsive), Footer, page modules
- Home: hero + President's message card + tagline band + 8 trade cards + notice board + quick links + Google Maps embed
- Apply form: validates required fields, success card with App ID + email confirmation
- Admin dashboard: stats cards, filters (course/status/search), inline status changer, detail modal, CSV download, logout
- SEO meta tags in `index.html`

### Testing
- Backend: 14 scenarios — **all passed (100%)** in `/app/test_reports/iteration_1.json`
- Email send is MOCKED (smtplib logs `[EMAIL MOCKED]` when `EMAIL_USER`/`EMAIL_PASS` are empty)

## MOCKED / Pending
- **Email sending** — currently MOCKED to console. Awaiting valid Gmail App Password (16-char lowercase) to wire live SMTP via `EMAIL_USER` + `EMAIL_PASS` env vars.
- **College logo** — placeholder "J" mark used; can be replaced when user provides image.

## Backlog (P0/P1/P2)
**P0 (next session, post user feedback)**
- Wire live Gmail emails once App Password received
- Replace placeholder logo with actual college logo

**P1**
- Document upload in application (object storage — 10th/12th marksheet, Aadhaar, photos, TC, Domicile, Caste, NCL, Income, Disability, Allotment letter)
- Admin notice board (CRUD, surface on Home)
- News & events section

**P2**
- Admissions chatbot for FAQs
- Faculty introduction section with photos
- Image gallery / campus infrastructure showcase
- Bulk email to applicants from admin

## Next Action Items
1. User to share **Gmail App Password** (16-char, no symbols) → swap MOCKED emails for live SMTP.
2. User to share **college logo** image → replace navbar/footer placeholder.
3. Confirm whether document uploads should be added next (P1).
