from .city_graph import CityGraph
from .zone import Zone


class CityGenerator:
    """
    Responsible for generating a city.
    """

    def __init__(self, rows: int, cols: int):
        self.rows = rows
        self.cols = cols

    def generate(self) -> CityGraph:
        city = CityGraph()

        zone_id = 1

        # Create all zones
        for x in range(self.rows):
            for y in range(self.cols):

                zone = Zone(
                    id=zone_id,
                    name=f"Zone {zone_id}",
                    zone_type="Residential",
                    x=x,
                    y=y,
                )

                city.add_zone(zone)

                zone_id += 1

        # Connect neighboring zones
        for zone in city.zones.values():

            x = zone.x
            y = zone.y

            current_id = zone.id

            # Right neighbor
            if y + 1 < self.cols:
                city.connect_zones(
                    current_id,
                    current_id + 1
                )

            # Bottom neighbor
            if x + 1 < self.rows:
                bottom_id = current_id + self.cols

                city.connect_zones(
                    current_id,
                    bottom_id
                )

        return city