import csv
import random


class DatasetGenerator:
    """
    Generates synthetic household data for ML training.
    """

    @staticmethod
    def generate(filename="dataset.csv", samples=1000):

        with open(filename, "w", newline="") as file:

            writer = csv.writer(file)

            writer.writerow([
                "income",
                "traffic",
                "pollution",
                "land_value",
                "happiness",
                "relocated"
            ])

            for _ in range(samples):

                income = random.randint(20000, 120000)

                traffic = round(random.uniform(0, 1), 2)

                pollution = round(random.uniform(0, 1), 2)

                land_value = round(random.uniform(0, 1), 2)

                happiness = round(random.uniform(0, 1), 2)

                utility = (
                    happiness * 0.4
                    + land_value * 0.2
                    - pollution * 0.2
                    - traffic * 0.2
                )

                relocated = 1 if utility < 0.45 else 0

                writer.writerow([
                    income,
                    traffic,
                    pollution,
                    land_value,
                    happiness,
                    relocated
                ])

        print(f"{samples} rows generated.")
if __name__ == "__main__":
    DatasetGenerator.generate()