from simulation.city.zone_type import ZoneType


class PollutionSystem:
    """
    Updates pollution levels across the city.
    """

    @staticmethod
    def update(state):
        """
        Update pollution for every zone.
        """

        city = state.city

        for zone in city.zones.values():

            # Traffic contributes to pollution
            if zone.traffic >= 80:
                zone.pollution += 3
            elif zone.traffic >= 60:
                zone.pollution += 2
            elif zone.traffic >= 40:
                zone.pollution += 1

            # Industrial areas generate additional pollution
            if zone.zone_type == ZoneType.INDUSTRIAL:
                zone.pollution += 2

            # Parks help reduce pollution
            elif zone.zone_type == ZoneType.PARK:
                zone.pollution -= 2

            # Keep pollution within bounds
            zone.pollution = max(0, min(zone.pollution, 100))