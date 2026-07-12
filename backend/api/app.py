from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.simulation import router as simulation_router
from simulation.app_state import simulation_state, simulation_engine
from api.routes.city import router as city_router
from api.routes.metrics import router as metrics_router

app = FastAPI(
    title="Genesis API",
    description="Backend API for the Genesis Urban Simulation Platform",
    version="1.0.0",
)

# -------------------------------------------------
# Allow React frontend
# -------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# Create ONE simulation state
# -------------------------------------------------

# -------------------------------------------------
# Routes
# -------------------------------------------------


@app.get("/")
def root():
    return {
        "message": "Genesis API is running."
    }


app.include_router(city_router)
app.include_router(metrics_router)
app.include_router(simulation_router)