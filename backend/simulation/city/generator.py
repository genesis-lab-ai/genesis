import random

from .. import constants
from .city_graph import CityGraph
from .planner import CityPlanner
from .zone import Zone
from .zone_type import ZoneType


class CityGenerator:
    """
    Responsible for generating a city.
    """

    def __init__(self, rows: int, cols: int):
        self.rows = rows
        self.cols = cols

    def _initialize_zone(self, zone: Zone) -> None:
        """
        Assign initial values to a zone based on its type.
        """

        if zone.zone_type is ZoneType.RESIDENTIAL:
            zone.population = random.randint(*constants.RESIDENTIAL_POPULATION)
            zone.employment = random.randint(*constants.RESIDENTIAL_EMPLOYMENT)
            zone.land_value = random.uniform(*constants.RESIDENTIAL_LAND_VALUE)
            zone.pollution = random.uniform(*constants.RESIDENTIAL_POLLUTION)
            zone.traffic = random.uniform(*constants.RESIDENTIAL_TRAFFIC)
            zone.happiness = random.uniform(*constants.RESIDENTIAL_HAPPINESS)

        elif zone.zone_type is ZoneType.COMMERCIAL:
            zone.population = 0
            zone.employment = random.randint(*constants.COMMERCIAL_EMPLOYMENT)
            zone.land_value = random.uniform(*constants.COMMERCIAL_LAND_VALUE)
            zone.pollution = random.uniform(*constants.COMMERCIAL_POLLUTION)
            zone.traffic = random.uniform(*constants.COMMERCIAL_TRAFFIC)
            zone.happiness = random.uniform(*constants.COMMERCIAL_HAPPINESS)

        elif zone.zone_type is ZoneType.INDUSTRIAL:
            zone.population = 0
            zone.employment = random.randint(*constants.INDUSTRIAL_EMPLOYMENT)
            zone.land_value = random.uniform(*constants.INDUSTRIAL_LAND_VALUE)
            zone.pollution = random.uniform(*constants.INDUSTRIAL_POLLUTION)
            zone.traffic = random.uniform(*constants.INDUSTRIAL_TRAFFIC)
            zone.happiness = random.uniform(*constants.INDUSTRIAL_HAPPINESS)

        elif zone.zone_type is ZoneType.PARK:
            zone.population = 0
            zone.employment = random.randint(*constants.PARK_EMPLOYMENT)
            zone.land_value = random.uniform(*constants.PARK_LAND_VALUE)
            zone.pollution = 0
            zone.traffic = random.uniform(*constants.PARK_TRAFFIC)
            zone.happiness = 100


    def _configure_road(self, road, zone1, zone2):
        """
        Configure a road based on the zones it connects.
        """

        types = {zone1.zone_type, zone2.zone_type}

        if len(types) == 1:

            zone_type = next(iter(types))

            if zone_type is ZoneType.RESIDENTIAL:
                road.road_type = "local"
                road.lanes = 2
                road.capacity = 100

            elif zone_type is ZoneType.COMMERCIAL:
                road.road_type = "avenue"
                road.lanes = 4
                road.capacity = 250

            elif zone_type is ZoneType.INDUSTRIAL:
                road.road_type = "arterial"
                road.lanes = 4
                road.capacity = 350

            elif zone_type is ZoneType.PARK:
                road.road_type = "local"
                road.lanes = 1
                road.capacity = 40

        else:
            road.road_type = "collector"
            road.lanes = 2
            road.capacity = 180


    def generate(self) -> CityGraph:

        city = CityGraph(
             rows=self.rows,
             cols=self.cols,
             )

        planner = CityPlanner(self.rows, self.cols)
        layout = planner.create_layout()

        zone_id = 1

        # Create all zones
        for x in range(self.rows):
            for y in range(self.cols):

                zone = Zone(
                    id=zone_id,
                    name=f"Zone {zone_id}",
                    zone_type=layout[x][y],
                    x=x,
                    y=y,
                )

                self._initialize_zone(zone)

                city.add_zone(zone)

                zone_id += 1

        # Connect neighboring zones
        # Connect neighboring zones
        for zone in city.zones.values():

            x = zone.x
            y = zone.y

            current_id = zone.id

            # Right neighbor
            if y + 1 < self.cols:

                neighbor = city.get_zone(current_id + 1)

                road = city.connect_zones(current_id, current_id + 1)

                self._configure_road(
                    road,
                    zone,
                    neighbor,
                )

            # Bottom neighbor
            if x + 1 < self.rows:

                bottom_id = current_id + self.cols

                neighbor = city.get_zone(bottom_id)

                road = city.connect_zones(current_id, bottom_id)

                self._configure_road(
                    road,
                    zone,
                    neighbor,
                )

        return city