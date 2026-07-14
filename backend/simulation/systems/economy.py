class EconomySystem:
    """
    Updates the economic health of each zone.
    """

    @staticmethod
    def update(state):

        city = state.city

        for zone in city.zones.values():

            # Strong economy
            if zone.happiness >= 80:
                zone.land_value += 15

            elif zone.happiness >= 60:
                zone.land_value += 8

            # Weak economy
            elif zone.happiness < 40:
                zone.land_value -= 10

            # Pollution hurts property values
            if zone.pollution >= 70:
                zone.land_value -= 8

            # Keep land value positive
            zone.land_value = max(zone.land_value, 100)