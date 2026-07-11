from fastapi import FastAPI

from simulation.city.generator import CityGenerator
from api.routes.city import router as city_router
app = FastAPI(
    title="Genesis API",
    description="Backend API for the Genesis Urban Simulation Platform",
    version="1.0.0"
)

# -------------------------------------------------
# Create one persistent city when the server starts
# -------------------------------------------------

generator = CityGenerator(rows=5, cols=5)
city = generator.generate()


@app.get("/")
def root():
    return {
        "message": "Genesis API is running."
    }

app.include_router(city_router)