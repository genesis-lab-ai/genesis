from fastapi import APIRouter

from api.serializers.city import serialize_city

router = APIRouter()


@router.get("/city")
def get_city():

    from api.app import city

    return serialize_city(city)