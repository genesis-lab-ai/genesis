from fastapi import APIRouter

from api.serializers.city import serialize_city

router = APIRouter()


@router.get("/city")
def get_city():

    from api.app import simulation_state

    return serialize_city(
        simulation_state.get_city()
    )