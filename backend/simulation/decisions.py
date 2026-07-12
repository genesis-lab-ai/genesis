from enum import Enum

from simulation.utility import UtilityCalculator


class Decision(Enum):
    STAY = "stay"
    WAIT = "wait"
    RELOCATE = "relocate"


class DecisionEngine:
    """
    Central place for all rule-based decisions.
    Later this class can call ML models instead of rules.
    """

    @staticmethod
    def household_decision(household, world_state):
        zone = world_state.city.get_zone(household.home_zone)

        utility = UtilityCalculator.household_score(zone)

        household.satisfaction = utility

        if utility < 0.4:
            return Decision.RELOCATE

        if utility < 0.7:
            return Decision.WAIT

        return Decision.STAY

    @staticmethod
    def business_decision(business, world_state):
        if business.profit < 0:
            return Decision.RELOCATE

        return Decision.STAY

    @staticmethod
    def commuter_decision(commuter, world_state):
        return commuter.preferred_transport