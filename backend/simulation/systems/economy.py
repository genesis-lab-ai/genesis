class EconomySystem:
    """
    Updates the economic health of each zone.
    """

    @staticmethod
    def update(state):

        city = state.city

        for zone in city.zones.values():

            value = 100

            # -----------------------
            # Happiness contribution
            # -----------------------
            if zone.happiness >= 80:
                value += 30
            elif zone.happiness >= 60:
                value += 20
            elif zone.happiness >= 40:
                value += 10
            else:
                value -= 10

            # -----------------------
            # Employment contribution
            # -----------------------
            if zone.employment >= 70:
                value += 20
            elif zone.employment >= 40:
                value += 10

            # -----------------------
            # Population contribution
            # -----------------------
            if zone.population >= 200:
                value += 20
            elif zone.population >= 100:
                value += 10

            # -----------------------
            # Pollution penalty
            # -----------------------
            if zone.pollution >= 9:
                value -= 25
            elif zone.pollution >= 6:
                value -= 15
            elif zone.pollution >= 3:
                value -= 5

            # -----------------------
            # Final land value
            # -----------------------
            zone.land_value = max(100, value)