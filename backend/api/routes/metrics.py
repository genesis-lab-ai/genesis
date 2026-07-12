from fastapi import APIRouter

router = APIRouter()


@router.get("/metrics")
def get_metrics():

    from api.app import simulation_state

    return simulation_state.get_metrics()