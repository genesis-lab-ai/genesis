from dataclasses import dataclass
from simulation.decisions import Decision


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

    def make_decision(self):
        """
        Temporary rule-based decision.
        Later this will use the ML relocation model.
        """

        if self.satisfaction < 0.4:
            return Decision.RELOCATE

        if self.satisfaction < 0.7:
            return Decision.WAIT

        return Decision.STAY