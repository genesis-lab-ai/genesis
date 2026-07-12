from simulation.city.city_graph import CityGraph
from simulation.state.simulation_state import SimulationState


class SimulationEngine:
    """
    Controls the execution of the city simulation.
    """

    def __init__(self, city: CityGraph):
        self.state = SimulationState(city)
        self.running = False

    def start(self):
        """
        Start the simulation.
        """
        self.running = True
        print("Simulation started.")

    def stop(self):
        """
        Stop the simulation.
        """
        self.running = False
        print("Simulation stopped.")

    def tick(self):
        """
        Advance the simulation by one tick.
        """
        self.state.advance_tick()

        print(f"Tick {self.state.current_tick}")

    def run(self, ticks: int):
        """
        Run the simulation for a fixed number of ticks.
        """

        self.start()

        for _ in range(ticks):
            self.tick()

        self.stop()