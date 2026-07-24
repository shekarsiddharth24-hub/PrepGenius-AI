from enum import Enum


class TargetRole(str, Enum):
    SOFTWARE_ENGINEER = "software_engineer"
    AIML_ENGINEER = "aiml_engineer"
    DATA_SCIENTIST = "data_scientist"
    DATA_ENGINEER = "data_engineer"