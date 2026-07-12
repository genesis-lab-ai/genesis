from simulation.state.simulation_state import SimulationState
from simulation.city.zone_type import ZoneType


class PopulationSystem:
    """
    Handles population growth and demographic changes.
    """

    @staticmethod
    def update(state: SimulationState) -> None:
        """
        Update population for one simulation tick.
        """

        for zone in state.city.zones.values():

            if zone.zone_type != ZoneType.RESIDENTIAL:
                continue

            growth = 0

            # Happy citizens attract more residents.
            if zone.happiness >= 85:
                growth += 3
            elif zone.happiness >= 70:
                growth += 1
            else:
                growth -= 2

            # Pollution discourages population growth.
            if zone.pollution >= 60:
                growth -= 3
            elif zone.pollution >= 40:
                growth -= 1

            # Employment availability attracts residents.
            if zone.employment >= 70:
                growth += 2
            elif zone.employment <= 20:
                growth -= 1

            zone.population = max(0, zone.population + growth)