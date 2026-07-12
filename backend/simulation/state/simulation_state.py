from simulation.city.city_graph import CityGraph
from simulation.metrics import MetricsCalculator


class SimulationState:
    """
    Stores the current state of the simulation.
    Acts as the single source of truth for the entire city.
    """

    def __init__(self, city: CityGraph):
        self.city = city
        self.current_tick = 0

    def advance_tick(self):
        """
        Advance the simulation by one tick.
        """
        self.current_tick += 1

    def get_city(self) -> CityGraph:
        """
        Return the current city.
        """
        return self.city

    def get_metrics(self) -> dict:
        """
        Calculate metrics for the current city.
        """
        calculator = MetricsCalculator(self.city)
        return calculator.calculate()