from dataclasses import dataclass, field
from typing import Optional


@dataclass
class Household:
    """
    Represents a household living inside the synthetic city.
    """

    id: int

    income: float

    home_zone: int

    work_zone: int

    family_size: int

    rent_budget: float

    commute_tolerance: float

    amenity_preference: float

    cost_sensitivity: float

    satisfaction: float = 1.0

    relocated: bool = False