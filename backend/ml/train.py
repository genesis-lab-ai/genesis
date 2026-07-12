import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


class RelocationTrainer:
    """
    Train the relocation prediction model.
    """

    @staticmethod
    def train(dataset_path="dataset.csv"):

        data = pd.read_csv(dataset_path)

        X = data[
            [
                "income",
                "traffic",
                "pollution",
                "land_value",
                "happiness",
            ]
        ]

        y = data["relocated"]

        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=42,
        )

        model = RandomForestClassifier(
            n_estimators=100,
            random_state=42,
        )

        model.fit(X_train, y_train)

        predictions = model.predict(X_test)

        accuracy = accuracy_score(y_test, predictions)

        print(f"Accuracy: {accuracy:.2f}")

        joblib.dump(model, "relocation_model.pkl")

        print("Model saved.")
if __name__ == "__main__":
    RelocationTrainer.train()