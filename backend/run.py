"""
run.py — Script de arranque del servidor FastAPI.

Uso:
    # Activar el entorno virtual del proyecto (si lo usas):
    # source ../.venv/bin/activate   (Linux/macOS)
    # ..\.venv\Scripts\activate      (Windows)

    python run.py
"""

import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
