"""
Create an admin user for API / Swagger authentication.

Run from project root with your venv activated (same as when you run uvicorn):
  python scripts/create_admin_user.py

Default credentials (use in Swagger UI Authorize):
  username: admin
  password: admin123
"""
import sys
import os

# Run from project root so imports work
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from auths.models import User
from auths.helper import hasher

ADMIN_USERNAME = "admin"
ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "admin123"  # change in production
ADMIN_ROLE = "admin"


def main():
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.username == ADMIN_USERNAME).first()
        if existing:
            print(f"User '{ADMIN_USERNAME}' already exists. Use username={ADMIN_USERNAME!r} and your password in Swagger.")
            return
        user = User(
            username=ADMIN_USERNAME,
            email=ADMIN_EMAIL,
            hashed_password=hasher.hash(ADMIN_PASSWORD),
            is_active=1,
            role=ADMIN_ROLE,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        print(f"Admin user created: username={ADMIN_USERNAME!r} id={user.id}")
        print(f"  Password: {ADMIN_PASSWORD!r}")
        print("In Swagger UI: click Authorize, then use username and password above.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
