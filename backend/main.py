from simulation.city.generator import CityGenerator
from simulation.engine.engine import SimulationEngine


def main():
    print("=" * 40)
    print("      Genesis Simulation")
    print("=" * 40)

    print("\nGenerating City...")

    generator = CityGenerator(rows=5, cols=5)
    city = generator.generate()

    print(f"Generated {city.total_zones()} zones.")

    print("\nInitializing Simulation Engine...")

    engine = SimulationEngine(city)

    print("Simulation Ready!\n")

    engine.run(ticks=5)


if __name__ == "__main__":
    main()