from simulation.state.simulation_state import SimulationState
from simulation.systems.registry import SYSTEMS


class SimulationEngine:
    """
    Controls the execution of the city simulation.
    """

    def __init__(self, state: SimulationState):
        self.state = state
        self.running = False

    def start(self):
        self.running = True
        print("Simulation started.")

    def stop(self):
        self.running = False
        print("Simulation stopped.")

    def tick(self):

        for system in SYSTEMS:
            system.update(self.state)

        self.state.advance_tick()

        print(f"Tick {self.state.current_tick}")

    def print_state(self):
        print("\n" + "=" * 70)
        print(f"STATE AFTER TICK {self.state.current_tick}")
        print("=" * 70)

        for zone in self.state.city.zones.values():
            print(
                f"{zone.name:15}"
                f" | {zone.zone_type.value:12}"
                f" | Pop={zone.population:3}"
                f" | Emp={zone.employment:3}"
                f" | Traf={zone.traffic:2}"
                f" | Poll={zone.pollution:2}"
                f" | Happy={zone.happiness:3}"
                f" | Land={zone.land_value:3}"
            )

    def run(self, ticks: int):

        self.start()

        for _ in range(ticks):
            self.tick()
            self.print_state()      # <-- Add this line

        self.stop()