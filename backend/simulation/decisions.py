from enum import Enum


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
        if household.satisfaction < 0.4:
            return Decision.RELOCATE

        if household.satisfaction < 0.7:
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