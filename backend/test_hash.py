import bcrypt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
try:
    h = pwd_context.hash("admin123")
    print("Passlib hash:", h)
except Exception as e:
    print("Error:", e)

h2 = bcrypt.hashpw(b"admin123", bcrypt.gensalt()).decode('utf-8')
print("Bcrypt hash:", h2)
print("Check:", bcrypt.checkpw(b"admin123", h2.encode('utf-8')))
