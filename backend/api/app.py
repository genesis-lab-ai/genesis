from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from simulation.city.generator import CityGenerator
from simulation.state.simulation_state import SimulationState

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

generator = CityGenerator(rows=20, cols=20)
city = generator.generate()

simulation_state = SimulationState(city)

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