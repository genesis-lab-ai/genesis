from dataclasses import dataclass
from simulation.decisions import DecisionEngine


@dataclass
class Household:
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

    def make_decision(self, world_state):
        return DecisionEngine.household_decision(self, world_state)