class Economy:
    """
    Calculates economic utility for agents.
    """

    @staticmethod
    def household_utility(household, zone):
        """
        Calculate a household utility score between 0 and 1.
        """

        utility = 0.0

        # Zone quality
        utility += zone.happiness * 0.40

        # Negative factors
        utility -= zone.pollution * 0.20
        utility -= zone.traffic * 0.20

        # Positive factor
        utility += zone.land_value * 0.20

        return max(0.0, min(1.0, utility))