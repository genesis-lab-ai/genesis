from simulation.city.city_graph import CityGraph
from simulation.city.zone_type import ZoneType


class MetricsCalculator:
    """
    Calculates city-wide metrics from the current simulation state.
    """

    def __init__(self, city: CityGraph):
        self.city = city

    def calculate(self) -> dict:
        zones = list(self.city.zones.values())

        residential = [
            z for z in zones
            if z.zone_type is ZoneType.RESIDENTIAL
        ]

        total_population = sum(z.population for z in zones)
        total_employment = sum(z.employment for z in zones)

        average_land_value = (
            sum(z.land_value for z in zones) / len(zones)
            if zones else 0
        )

        average_pollution = (
            sum(z.pollution for z in zones) / len(zones)
            if zones else 0
        )

        average_traffic = (
            sum(z.traffic for z in zones) / len(zones)
            if zones else 0
        )

        average_happiness = (
            sum(z.happiness for z in residential) / len(residential)
            if residential else 0
        )

        employment_rate = (
            (total_employment / total_population) * 100
            if total_population > 0 else 0
        )

        return {
            "population": total_population,
            "employment": total_employment,
            "employment_rate": round(employment_rate, 2),
            "average_land_value": round(average_land_value, 2),
            "average_pollution": round(average_pollution, 2),
            "average_traffic": round(average_traffic, 2),
            "average_happiness": round(average_happiness, 2),
        }