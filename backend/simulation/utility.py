class UtilityCalculator:
    """
    Calculates utility scores for intelligent agents.
    """

    @staticmethod
    def household_score(zone):
        score = 0.0

        score += zone.happiness * 0.40
        score += zone.land_value * 0.20

        score -= zone.pollution * 0.20
        score -= zone.traffic * 0.20

        return max(0.0, min(1.0, score))