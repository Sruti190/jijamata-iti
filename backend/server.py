from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import csv
import io
import secrets
import resend
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone, timedelta
import jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ---- env ----
MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
JWT_SECRET = os.environ.get("JWT_SECRET", "change-me")
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# ---- db ----
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="Jijamata ITI API")
api = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
log = logging.getLogger("jijamata")

VALID_COURSES = [
    "Electrician", "Fitter", "Welder", "COPA",
    "Turner", "Wireman", "Electronics Mechanic", "Painter General",
]
VALID_STATUSES = ["New", "Contacted", "Approved", "Rejected"]


# ---- models ----
class ApplicationIn(BaseModel):
    fullName: str
    email: Optional[str] = ""
    phone: str
    dob: str
    course: str
    address: Optional[str] = ""
    gender: Optional[str] = ""
    category: Optional[str] = ""
    fatherName: Optional[str] = ""
    motherName: Optional[str] = ""
    qualification: Optional[str] = ""
    qualificationYear: Optional[str] = ""
    qualificationMarks: Optional[str] = ""
    notes: Optional[str] = ""


class LoginIn(BaseModel):
    username: str
    password: str


class StatusIn(BaseModel):
    status: str


# ---- helpers ----
def gen_app_id() -> str:
    return f"JITI-{secrets.token_hex(2).upper()}-{secrets.token_hex(2).upper()}"


def make_token(username: str) -> str:
    payload = {
        "sub": username,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def require_admin(authorization: Optional[str] = Header(None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload["sub"]
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


def _send_email(to_addr: str, subject: str, html: str) -> None:
    if not RESEND_API_KEY:
        log.info(f"[EMAIL MOCKED] to={to_addr} subject={subject}")
        return
    try:
        params = {"from": SENDER_EMAIL, "to": [to_addr], "subject": subject, "html": html}
        result = resend.Emails.send(params)
        log.info(f"[EMAIL SENT] to={to_addr} id={result.get('id') if isinstance(result, dict) else result}")
    except Exception as e:
        log.exception(f"[EMAIL FAILED] to={to_addr}: {e}")


def send_emails(app_doc: dict) -> None:
    student_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;padding:20px">
      <h2 style="color:#0b3d91">Application Received — Jijamata Private ITI, Bhenda</h2>
      <p>Dear {app_doc['fullName']},</p>
      <p>Thank you for applying for <b>{app_doc['course']}</b>. Your application ID is
        <b style="color:#0b3d91">{app_doc['applicationId']}</b>. Our faculty will contact you soon.</p>
      <p style="margin-top:24px">Warm regards,<br/>Admissions Office<br/>Jijamata Private Industrial Training Institute, Bhenda<br/>ITI Code: PR27000096</p>
    </div>
    """
    rows = "".join(
        f"<tr><td style='padding:6px 10px;background:#f5f7fb'><b>{k}</b></td>"
        f"<td style='padding:6px 10px'>{v}</td></tr>"
        for k, v in app_doc.items() if k != "_id"
    )
    admin_html = f"""
    <div style="font-family:Arial,sans-serif;padding:20px">
      <h2 style="color:#0b3d91">New Admission Application Received</h2>
      <table style="border-collapse:collapse;width:100%;max-width:700px;border:1px solid #e6e9f0">{rows}</table>
    </div>
    """
    _send_email(app_doc["email"], "Application Received — Jijamata ITI Bhenda", student_html)
    if ADMIN_EMAIL:
        _send_email(ADMIN_EMAIL, "New Admission Application Received", admin_html)


# ---- routes ----
@api.get("/health")
async def health():
    return {"status": "ok", "service": "Jijamata ITI API", "time": datetime.now(timezone.utc).isoformat()}


@api.post("/applications")
async def submit_application(payload: ApplicationIn):
    if payload.course not in VALID_COURSES:
        raise HTTPException(status_code=400, detail=f"Invalid course. Must be one of {VALID_COURSES}")
    if not payload.fullName.strip() or not payload.phone.strip() or not payload.dob.strip():
        raise HTTPException(status_code=400, detail="Missing required fields")

    doc = payload.model_dump()
    doc["applicationId"] = gen_app_id()
    doc["status"] = "New"
    doc["createdAt"] = datetime.now(timezone.utc).isoformat()
    doc["updatedAt"] = doc["createdAt"]

    await db.applications.insert_one(doc)
    doc.pop("_id", None)
    if doc.get("email"):# fire-and-forget email send so the response is fast
        asyncio.create_task(asyncio.to_thread(send_emails, doc))
    return {
        "ok": True,
        "applicationId": doc["applicationId"],
        "status": doc["status"],
        "message": "Application submitted. Our team will call you shortly.",
    }


@api.post("/admin/login")
async def admin_login(payload: LoginIn):
    if payload.username != ADMIN_USERNAME or payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": make_token(payload.username), "username": payload.username}


@api.get("/admin/applications")
async def list_applications(
    course: Optional[str] = None,
    status: Optional[str] = None,
    _: str = Depends(require_admin),
):
    q: dict = {}
    if course:
        q["course"] = course
    if status:
        q["status"] = status
    cur = db.applications.find(q, {"_id": 0}).sort("createdAt", -1).limit(500)
    docs = await cur.to_list(length=500)
    return {"applications": docs, "count": len(docs)}


@api.get("/admin/stats")
async def stats(_: str = Depends(require_admin)):
    total = await db.applications.count_documents({})
    by_status: dict = {}
    for s in VALID_STATUSES:
        by_status[s] = await db.applications.count_documents({"status": s})
    by_course: dict = {}
    for c in VALID_COURSES:
        by_course[c] = await db.applications.count_documents({"course": c})
    return {"total": total, "byStatus": by_status, "byCourse": by_course}


@api.patch("/admin/applications/{application_id}")
async def update_status(application_id: str, payload: StatusIn, _: str = Depends(require_admin)):
    if payload.status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of {VALID_STATUSES}")
    res = await db.applications.update_one(
        {"applicationId": application_id},
        {"$set": {"status": payload.status, "updatedAt": datetime.now(timezone.utc).isoformat()}},
    )
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"ok": True, "status": payload.status}


@api.get("/admin/applications/csv")
async def export_csv(_: str = Depends(require_admin)):
    cur = db.applications.find({}, {"_id": 0}).sort("createdAt", -1)
    docs = await cur.to_list(length=5000)
    cols = [
        "applicationId", "status", "createdAt", "fullName", "email", "phone", "dob",
        "course", "gender", "category", "fatherName", "motherName", "address",
        "qualification", "qualificationYear", "qualificationMarks", "notes",
    ]
    buf = io.StringIO()
    w = csv.DictWriter(buf, fieldnames=cols, extrasaction="ignore")
    w.writeheader()
    for d in docs:
        w.writerow(d)
    return Response(
        content=buf.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=jijamata_applications.csv"},
    )

@api.delete("/admin/applications")
async def clear_applications(_: str = Depends(require_admin)):
    result = await db.applications.delete_many({})
    return {"ok": True, "deleted": result.deleted_count}
app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
