from .zone import Zone


class CityGraph:
    """
    Represents the city's graph structure.

    Stores all zones and the connections between them.
    """

    def __init__(self):
        # Maps zone_id -> Zone object
        self.zones: dict[int, Zone] = {}

        # Maps zone_id -> List of connected zone_ids
        self.connections: dict[int, list[int]] = {}

    def add_zone(self, zone: Zone) -> None:
        """
        Add a new zone to the city.
        """
        self.zones[zone.id] = zone
        self.connections[zone.id] = []

    def connect_zones(self, zone1_id: int, zone2_id: int) -> None:
        """
        Create a two-way connection between two zones.
        """

        if zone1_id not in self.zones or zone2_id not in self.zones:
            raise ValueError("Both zones must exist before connecting them.")

        if zone2_id not in self.connections[zone1_id]:
            self.connections[zone1_id].append(zone2_id)

        if zone1_id not in self.connections[zone2_id]:
            self.connections[zone2_id].append(zone1_id)

    def get_zone(self, zone_id: int) -> Zone:
        """
        Retrieve a zone using its ID.
        """
        return self.zones[zone_id]

    def get_neighbors(self, zone_id: int) -> list[int]:
        """
        Return all neighboring zone IDs.
        """
        return self.connections[zone_id]

    def total_zones(self) -> int:
        """
        Return the total number of zones.
        """
        return len(self.zones)