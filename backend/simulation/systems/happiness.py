from simulation.city.zone_type import ZoneType


class HappinessSystem:
    """
    Updates citizen happiness.
    """

    @staticmethod
    def update(state):

        city = state.city

        for zone in city.zones.values():

            # Pollution reduces happiness
            if zone.pollution >= 80:
                zone.happiness -= 3
            elif zone.pollution >= 60:
                zone.happiness -= 2
            elif zone.pollution >= 40:
                zone.happiness -= 1

            # Parks improve happiness
            if zone.zone_type == ZoneType.PARK:
                zone.happiness += 2

            # Residential neighborhoods benefit slightly
            elif zone.zone_type == ZoneType.RESIDENTIAL:
                zone.happiness += 1

            # Industrial zones are less pleasant
            elif zone.zone_type == ZoneType.INDUSTRIAL:
                zone.happiness -= 1

            # Keep within bounds
            zone.happiness = max(0, min(zone.happiness, 100))