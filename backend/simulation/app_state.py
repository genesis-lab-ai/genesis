from simulation.city.generator import CityGenerator
from simulation.state.simulation_state import SimulationState
from simulation.engine.engine import SimulationEngine

generator = CityGenerator(rows=20, cols=20)
city = generator.generate()

simulation_state = SimulationState(city)
simulation_engine = SimulationEngine(simulation_state)