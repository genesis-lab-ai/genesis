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

            # -----------------------
            # Happiness
            # -----------------------
            if zone.happiness >= 80:
                growth += 3
            elif zone.happiness >= 60:
                growth += 2
            elif zone.happiness >= 40:
                growth += 1
            else:
                growth -= 2

            # -----------------------
            # Pollution
            # -----------------------
            if zone.pollution >= 9:
                growth -= 3
            elif zone.pollution >= 6:
                growth -= 2
            elif zone.pollution >= 3:
                growth -= 1

            # -----------------------
            # Employment
            # -----------------------
            if zone.employment >= 70:
                growth += 2
            elif zone.employment >= 40:
                growth += 1
            elif zone.employment <= 20:
                growth -= 1

            # -----------------------
            # Land Value
            # -----------------------
            if zone.land_value >= 150:
                growth += 2
            elif zone.land_value >= 120:
                growth += 1

            # -----------------------
            # Apply growth
            # -----------------------
            zone.population = max(0, zone.population + growth)