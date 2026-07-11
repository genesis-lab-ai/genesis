from dataclasses import dataclass

from .zone_type import ZoneType


@dataclass
class Zone:
    """
    Represents a single zone in the city.
    """

    id: int
    name: str
    zone_type: ZoneType
    x: int
    y: int

    population: int = 0
    employment: int = 0

    land_value: float = 0.0
    pollution: float = 0.0
    traffic: float = 0.0
    happiness: float = 0.0