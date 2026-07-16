from dataclasses import dataclass


@dataclass
class RoadEdge:
    """
    Represents a road connecting two zones.

    Stores simulation data about the road itself,
    separate from the graph connectivity.
    """

    id: int

    from_zone: int
    to_zone: int

    road_type: str = "local"

    lanes: int = 2
    capacity: int = 100

    traffic: float = 0.0
    condition: float = 100.0

    under_construction: bool = False