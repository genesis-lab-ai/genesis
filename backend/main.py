from simulation.city.generator import CityGenerator
from simulation.engine.engine import SimulationEngine


def main():
    print("=" * 40)
    print("      Genesis Simulation")
    print("=" * 40)

    print("\nGenerating City...")

    generator = CityGenerator(rows=5, cols=5)
    city = generator.generate()

    # ------------------------------
    # Temporary Debug Visualization
    # ------------------------------
    print("\nCity Layout:\n")

    symbols = {
        "Residential": "🏠",
        "Commercial": "🏢",
        "Industrial": "🏭",
        "Park": "🌳",
    }

    for x in range(5):

        row = []

        for y in range(5):

            zone_id = x * 5 + y + 1

            zone = city.get_zone(zone_id)

            row.append(symbols[zone.zone_type.value])

        print(" ".join(row))

    print(f"\nGenerated {city.total_zones()} zones.")
    print("\n" + "=" * 40)
    print("Sample Zone Information")
    print("=" * 40)

    zone = city.get_zone(1)

    print(f"ID          : {zone.id}")
    print(f"Name        : {zone.name}")
    print(f"Type        : {zone.zone_type.value}")
    print(f"Population  : {zone.population}")
    print(f"Employment  : {zone.employment}")
    print(f"Land Value  : ₹{zone.land_value:.2f}")
    print(f"Pollution   : {zone.pollution:.2f}")
    print(f"Traffic     : {zone.traffic:.2f}")
    print(f"Happiness   : {zone.happiness:.2f}")

    print("\nInitializing Simulation Engine...")

    engine = SimulationEngine(city)

    print("Simulation Ready!\n")

    engine.run(ticks=5)


if __name__ == "__main__":
    main()