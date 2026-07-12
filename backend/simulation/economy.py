class Economy:
    """
    Updates economic indicators for the simulation.
    """

    @staticmethod
    def calculate_household_satisfaction(household, zone):
        """
        Calculate satisfaction based on the zone where the household lives.
        """

        satisfaction = zone.happiness

        satisfaction -= zone.pollution * 0.2
        satisfaction -= zone.traffic * 0.2

        satisfaction += zone.land_value * 0.1

        return max(0.0, min(1.0, satisfaction))