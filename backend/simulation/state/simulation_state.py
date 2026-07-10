from simulation.city.city_graph import CityGraph


class SimulationState:
    """
    Stores the current state of the simulation.
    """

    def __init__(self, city: CityGraph):
        self.city = city
        self.current_tick = 0

    def advance_tick(self):
        """
        Advance the simulation by one tick.
        """
        self.current_tick += 1