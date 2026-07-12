from enum import Enum


class ZoneType(Enum):
    """
    Represents the different types of zones
    that can exist in the city.
    """

    RESIDENTIAL = "Residential"
    COMMERCIAL = "Commercial"
    INDUSTRIAL = "Industrial"
    PARK = "Park"