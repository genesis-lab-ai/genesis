from simulation.decisions import Decision


class IntelligenceManager:
    """
    Coordinates all intelligent agents.
    """

    def __init__(self):
        self.households = []
        self.businesses = []
        self.commuters = []

    def register_household(self, household):
        self.households.append(household)

    def register_business(self, business):
        self.businesses.append(business)

    def register_commuter(self, commuter):
        self.commuters.append(commuter)

    def update(self, world_state):
        """
        Ask every agent to make a decision.
        """

        decisions = []

        for household in self.households:
            decisions.append(household.make_decision(world_state))

        for business in self.businesses:
            decisions.append(business.make_decision(world_state))

        for commuter in self.commuters:
            decisions.append(commuter.choose_transport(world_state))

        return decisions