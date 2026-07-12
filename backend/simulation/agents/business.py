from dataclasses import dataclass

from simulation.decisions import Decision
from simulation.decisions import DecisionEngine

@dataclass
class Business:
    """
    Represents a business operating inside the city.
    """

    id: int
    name: str
    sector: str

    location_zone: int

    employees: int

    monthly_revenue: float

    monthly_rent: float

    profit: float

    relocated: bool = False

    def make_decision(self, world_state):
      return DecisionEngine.business_decision(self, world_state)