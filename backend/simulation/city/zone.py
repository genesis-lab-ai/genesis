from dataclasses import dataclass


@dataclass
class Zone:
    """
    Represents a single zone in the city simulation.
    """

    id: int
    name: str
    zone_type: str

    x: int
    y: int

    population: int = 0
    employment_capacity: int = 0

    rent: float = 0.0
    tax_rate: float = 0.0
    amenity_score: float = 0.0