from simulation.state.simulation_state import SimulationState
from simulation.systems.population import PopulationSystem
from simulation.systems.traffic import TrafficSystem
from simulation.systems.pollution import PollutionSystem
from simulation.systems.economy import EconomySystem
from simulation.systems.happiness import HappinessSystem

class SimulationEngine:
    """
    Controls the execution of the city simulation.
    """

    def __init__(self, state: SimulationState):
        self.state = state
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

        PopulationSystem.update(self.state)
        TrafficSystem.update(self.state)
        PollutionSystem.update(self.state)
        EconomySystem.update(self.state)
        HappinessSystem.update(self.state)

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