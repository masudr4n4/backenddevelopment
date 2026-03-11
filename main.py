from fastapi import FastAPI
from fastapi.openapi.docs import get_swagger_ui_html
from auths import auth
from todos import todos
from fan_followers import followers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(openapi_url="/openapi.json", docs_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only!
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Todo API", "docs": "/docs", "health": "/health"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/docs", include_in_schema=False)
async def swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title="Todo API - Swagger UI",
        swagger_js_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js",
        swagger_css_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css",
    )


app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(todos.router, tags=["Todos"])
app.include_router(followers.router, tags=["Fan/Followers"])