from fastapi import APIRouter

from simulation.app_state import simulation_engine
router = APIRouter(prefix="/simulation", tags=["Simulation"])


@router.post("/tick")
def tick_simulation():
    """
    Advance the simulation by one tick.
    """

    simulation_engine.tick()

    return {
        "status": "success",
        "current_tick": simulation_engine.state.current_tick,
    }