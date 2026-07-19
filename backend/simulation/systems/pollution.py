from simulation.city.zone_type import ZoneType


class PollutionSystem:

    @staticmethod
    def update(state):

        city = state.city

        for zone in city.zones.values():

            pollution = 0

            # -----------------------
            # Traffic contribution
            # -----------------------
            if zone.traffic >= 9:
                pollution += 3
            elif zone.traffic >= 6:
                pollution += 2
            elif zone.traffic >= 3:
                pollution += 1

            # -----------------------
            # Zone contribution
            # -----------------------
            if zone.zone_type == ZoneType.INDUSTRIAL:
                pollution += 2

            elif zone.zone_type == ZoneType.COMMERCIAL:
                pollution += 1

            elif zone.zone_type == ZoneType.PARK:
                pollution -= 2

            zone.pollution = max(0, min(pollution, 100))