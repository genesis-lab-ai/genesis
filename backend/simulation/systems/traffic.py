from simulation.city.zone_type import ZoneType


class TrafficSystem:
    """
    Updates traffic levels across the city.
    """

    @staticmethod
    def update(state):
        """
        Recalculate traffic for every zone.
        """

        city = state.city

        for zone in city.zones.values():

            # -----------------------
            # Base traffic by zone
            # -----------------------
            if zone.zone_type == ZoneType.RESIDENTIAL:
                base = 1

            elif zone.zone_type == ZoneType.COMMERCIAL:
                base = 2

            elif zone.zone_type == ZoneType.INDUSTRIAL:
                base = 3

            else:  # Park
                base = 0

            # -----------------------
            # Population contribution
            # -----------------------
            if zone.population >= 200:
                population_bonus = 3
            elif zone.population >= 100:
                population_bonus = 2
            elif zone.population >= 50:
                population_bonus = 1
            else:
                population_bonus = 0

            # -----------------------
            # Employment contribution
            # -----------------------
            if zone.employment >= 70:
                employment_bonus = 3
            elif zone.employment >= 40:
                employment_bonus = 2
            elif zone.employment >= 20:
                employment_bonus = 1
            else:
                employment_bonus = 0

            # -----------------------
            # Final traffic
            # -----------------------
            zone.traffic = max(
                0,
                min(base + population_bonus + employment_bonus, 100)
            )