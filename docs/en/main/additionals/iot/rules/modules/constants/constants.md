The `constants` module works with global constants. It defines a function to get a global constant by its name:
```python
class BadParamsError(Exception):
    pass

class ConstantNotFoundError(Exception):
    pass

class UnknownError(Exception):
    pass

def get_by_name(name: str) -> Constant:
    pass
```

The object of the constant contains the properties of the constant: its name, identifier, type and value:
```python
class Type(Enum):
    int = 0
    float = 1
    long = 2
    double = 3
    timestamp = 4
    string = 5
    array = 6

class Constant:
	id:    int
	name:  str
	type:  Type
	value: Any
```

An example of obtaining a constant value by its name:
```python
from coiiot_sdk import constants, user_logs

logger = user_logs.get_logger()

test_int = constants.get_by_name("test_int")
logger.info(f'{ test_int.value }')
```
