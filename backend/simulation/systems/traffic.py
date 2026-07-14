from simulation.city.zone_type import ZoneType


class TrafficSystem:
    """
    Updates traffic levels across the city.
    """

    @staticmethod
    def update(state):
        """
        Update traffic values for every zone.
        """

        city = state.city

        for zone in city.zones.values():

            if zone.zone_type == ZoneType.RESIDENTIAL:
                zone.traffic += 1

            elif zone.zone_type == ZoneType.COMMERCIAL:
                zone.traffic += 2

            elif zone.zone_type == ZoneType.INDUSTRIAL:
                zone.traffic += 3

            elif zone.zone_type == ZoneType.PARK:
                zone.traffic -= 1

            # Keep traffic within valid bounds
            zone.traffic = max(0, min(zone.traffic, 100))