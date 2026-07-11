import random

from .zone_type import ZoneType


class CityPlanner:
    """
    Responsible for designing the city's layout.
    """

    def __init__(self, rows: int, cols: int):
        self.rows = rows
        self.cols = cols

    def create_layout(self):
        """
        Create a blueprint describing
        which zone type belongs in each cell.
        """

        # Create an empty layout
        layout = [
            [None for _ in range(self.cols)]
            for _ in range(self.rows)
        ]

        # Choose a city center
        center_x = random.randint(
            self.rows // 3,
            (2 * self.rows) // 3
        )

        center_y = random.randint(
            self.cols // 3,
            (2 * self.cols) // 3
        )

        # Maximum possible Manhattan distance
        max_distance = self.rows + self.cols - 2

        commercial_radius = max_distance * 0.20
        residential_radius = max_distance * 0.55

        for x in range(self.rows):
            for y in range(self.cols):

                distance = abs(x - center_x) + abs(y - center_y)

                if distance <= commercial_radius:
                    layout[x][y] = ZoneType.COMMERCIAL

                elif distance <= residential_radius:
                    layout[x][y] = ZoneType.RESIDENTIAL

                else:
                    layout[x][y] = ZoneType.INDUSTRIAL

        num_parks = max(1, int(self.rows * self.cols * 0.05))

        for _ in range(num_parks):

            x = random.randint(0, self.rows - 1)
            y = random.randint(0, self.cols - 1)

            if layout[x][y] is ZoneType.RESIDENTIAL:
                layout[x][y] = ZoneType.PARK

        return layout