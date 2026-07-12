from enum import Enum


class ShockType(Enum):
    NEW_METRO = "new_metro"
    TAX_INCREASE = "tax_increase"
    PARK_CONSTRUCTION = "park_construction"
    FACTORY_OPENING = "factory_opening"


class ShockManager:
    """
    Applies external events to the city.
    """

    @staticmethod
    def apply(shock_type, zone):
        if shock_type == ShockType.NEW_METRO:
            zone.traffic = max(0.0, zone.traffic - 0.2)
            zone.happiness = min(1.0, zone.happiness + 0.1)

        elif shock_type == ShockType.PARK_CONSTRUCTION:
            zone.happiness = min(1.0, zone.happiness + 0.2)

        elif shock_type == ShockType.FACTORY_OPENING:
            zone.pollution = min(1.0, zone.pollution + 0.3)
            zone.employment += 100

        elif shock_type == ShockType.TAX_INCREASE:
            zone.land_value = max(0.0, zone.land_value - 0.1)