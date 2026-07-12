from dataclasses import dataclass


@dataclass
class Commuter:
    """
    Represents the daily commute of a household.
    """

    id: int

    household_id: int

    home_zone: int

    work_zone: int

    preferred_transport: str = "car"

    commute_time: float = 0.0

    def choose_transport(self, world_state):
        """
        Placeholder transport choice.
        Later this will consider traffic,
        metro availability and cost.
        """

        return self.preferred_transport