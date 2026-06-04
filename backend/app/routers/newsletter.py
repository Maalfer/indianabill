"""
routers/newsletter.py — Alta de suscriptores a la newsletter. Endpoint público.
"""

import re
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.newsletter import NewsletterSubscriber

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])

_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class NewsletterCreate(BaseModel):
    email: str
    origen: Optional[str] = "web"


@router.post("/", status_code=status.HTTP_201_CREATED)
def subscribe(data: NewsletterCreate, db: Session = Depends(get_db)):
    email = (data.email or "").lower().strip()
    if not _EMAIL_RE.match(email):
        raise HTTPException(status_code=422, detail="Email no valido")
    existing = (
        db.query(NewsletterSubscriber)
        .filter(NewsletterSubscriber.email == email)
        .first()
    )
    if existing:
        return {"ok": True, "already": True}
    db.add(NewsletterSubscriber(email=email, origen=(data.origen or "web")))
    db.commit()
    return {"ok": True}
