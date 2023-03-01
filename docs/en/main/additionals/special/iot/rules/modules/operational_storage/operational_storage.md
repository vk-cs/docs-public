## Описание

Module `operational_storage` contains the following functions and classes of errors to work with `Operational Storage`:
```python
class InsertionError(Exception):
    pass

class UpsertionError(Exception):
    pass

class SelectionError(Exception):
    pass

class BadParamsError(Exception):
    pass

class NotFoundError(Exception):
    pass


def insert() -> Insert:
    """
    insert() Returns an object to insert the values of the type tags event in Operational Storage
    """

def select_latest(tag: Tag) -> SelectLatest:
    """
    select_latest() Returns the object for sampling the last value of Tag Tag event from Operational Storage
    """

def select(tag: Tag, from_ts: datetime, to_ts: datetime) -> Select:
    """
    select() Returns an object for sampling values from Operational Storage
    This object supports aggregation, grouping, displacement, etc.
    Apply for tags typeevent и aggregate
    """

def upsert() -> Upsert:
    """
    upsert() returns an object to be inserted, updating aggregate tag values in Operational Storage
     that is, if the tag value already exists in the storage at the specified timestamp, then the tag value is updated
    """

def select_current(tag: Tag) -> SelectCurrent:
    """
    select_current() returns an object for fetching the current value of an aggregate tag from Operational Storage
     The current tag value is the tag value for the current aggregation period
    """
```

## Event

Call `insert()`returns an `Insert` object with the following interface:
```python
class Insert:
    def values(self, tag: Tag, value: Any, timestamp: datetime) -> 'Insert':
		pass

    def msg(self, msg: Message) -> 'Insert':
		pass

    def execute(self):
		pass
```
The `values(tag, value, timestamp)` method is for inserting a specific value. To insert a value from a message, you can use the `msg(message)` method:
```python
from coiiot_sdk import operational_storage as op_store, context

ctx = context.current()

# store received message in storage
op_store.insert().msg(ctx.msg).execute()
```

## Getting the last value of a tag

Very often we need the last value of a tag. The `select_latest(tag)` function is responsible for this.

Calling `select_latest(tag)` returns an object of class `SelectLatest` with the following interface:
```python
class Event(TypedDict):
    payload: Dict[str, Any]
    received_at: int
    time: int
    value: Any

class LatestEvent(TypedDict):
    data: Event
    tag_id: int
    value_type: str


class SelectLatest:

    def execute(self) -> LatestEvent:
        pass
```

An example of obtaining the last tag value:
```
from coiiot_sdk import operational_storage as op_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

latest = op_store.select_latest(ctx.tag).execute()
logger.info(f"{ latest.data.value }")
```

## Aggregate

Very often, for an `aggregate` type tag, we need its current value, that is, the value for the current, not yet completed aggregation period. The `select_current(tag)` function is responsible for this.

Calling `select_current(tag)` returns an object of class `SelectCurrent` with the following interface:
```python
class Aggregate(TypedDict):
    payload: Dict[str, Any]
    received_at: int
    time: int
    value: Any

class CurrentAggregate(TypedDict):
    data: Aggregate
    tag_id: int
    value_type: str

class SelectCurrent:

    def execute(self) -> CurrentAggregate:
        pass
```

An example of getting the current value of a tag-aggregate:
```python
from coiiot_sdk import operational_storage as op_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

current = op_store.select_current(ctx.tag).execute()
logger.info(f"{ current.data.value }")
```

## Insert with tag value update

Calling `upsert()` returns an `Upsert` object with the following interface:
```python
class Upsert:
    def values(self, tag: Tag, value: Any, timestamp: datetime) -> 'Upsert':
		pass

    def msg(self, msg: Message) -> 'Upsert':
		pass

    def execute(self):
		pass
```
The `values(tag, value, timestamp)` method is for inserting or updating a particular value. To insert a value from a message, you can use the `msg(message)` method:
```python
from coiiot_sdk import operational_storage as op_store, context

ctx = context.current()

# store received message in storage
op_store.upsert().msg(ctx.msg).execute()
```
If the tag value already exists in the storage at the specified timestamp, then the tag value is updated.

## Getting values

For a more complex selection of values, you can use the `select(tag, from_ts, to_ts)` method.

The method is applicable to both `event` type tags and `aggregate` type tags.

The method returns an object of the `Select` class with the following interface:
```python
class Select:

    def with_offset(self, offset: int) -> 'Select':
    """
    Set offset to start fetching values
    """
        
        def with_limit(self, limit: int) -> 'Select':
    """
    Set a limit on the number of selected values
    """

        def order_by(self, **kwargs) -> 'Select':
    """
    Specifies the sort order of the selection using named parameters.
            The parameter name designates the sort field.
            The value of the parameter specifies the sort order, can be either "asc" or "desc"
    """

        def with_period(self, period: str) -> 'Select':
    """
    Do aggregation for a given time period
    """

        def calc_max_as(self, alias: str) -> 'Select':
    """
    Calculate maximum under alias given by alias (aggregation)
    """

        def calc_max(self) -> 'Select':
    """
    Shorthand for calc_max_as("max")
    """

        def calc_min_as(self, alias: str) -> 'Select':
    """
    Compute minimum under alias given by alias (aggregation)
    """
        
        def calc_min(self) -> 'Select':
    """
    Shorthand for calc_min_as("min")
    """

        def calc_avg_as(self, alias: str) -> 'Select':
    """
    Calculate mean under alias given by alias (aggregation)
    """

        def calc_avg(self) -> 'Select':
    """
    Shorthand for calc_avg_as("avg")
    """
        
        def calc_count_as(self, alias: str) -> 'Select':
    """
    Calculate count under alias given by alias (aggregation)
    """

        def calc_count(self) -> 'Select':
    """
    Shorthand for calc_count_as("count")
    """

        def calc_sum_as(self, alias: str) -> 'Select':
    """
    Compute sum under alias given by alias (aggregation)
    """
        
        def calc_sum(self) -> 'Select':
    """
    Shorthand for calc_sum_as("sum")
    """
    
    def execute(self) -> SelectionResult:
		pass
```

There are many use cases for `Select`, so the `execute()` method returns a fairly complex `SelectionResult` type.

Below is its full description.
```python
class Event(TypedDict):
    payload: Dict[str, Any]
    received_at: int
    time: int
    value: Any

class Events(TypedDict):
    data: List[Event]
    tag_id: int
    value_type: str

class EventsAggregate(TypedDict):
    data: Dict[str, Union[int, float]]
    tag_id: int
    value_type: str

class GroupAggregateOfEvents(TypedDict):
    end_time: int
    start_time: int
    value: Dict[str, Union[int, float]]

class EventsGroupAggregate(TypedDict):
    data: List[GroupAggregateOfEvents]
    tag_id: int
    value_type: str

class Aggregate(TypedDict):
    payload: Dict[str, Any]
    received_at: int
    time: int
    value: Any

class Aggregates(TypedDict):
    data: List[Aggregate]
    tag_id: int
    value_type: str

class AggregatesAggregate(TypedDict):
    data: Dict[str, Union[int, float]]
    tag_id: int
    value_type: str

class GroupAggregateOfAggregates(TypedDict):
    end_time: int
    start_time: int
    value: Dict[str, Union[int, float]]

class AggregatesGroupAggregate(TypedDict):
    data: List[GroupAggregateOfAggregates]
    tag_id: int
    value_type: str

AggregateEvents = Union[EventsAggregate, EventsGroupAggregate]
EventsResult = Union[AggregateEvents, Events]

AggregateAggregates = Union[AggregatesAggregate, AggregatesGroupAggregate]
AggregatesResult = Union[AggregateAggregates, Aggregates]

SelectionResult = Union[AggregatesResult, EventsResult]
```

An example of calculating the minimum and maximum for the last 30 seconds:
```python
import datetime
from coiiot_sdk import operational_storage as op_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

to_ts = datetime.datetime.now()
from_ts = to_ts - datetime.timedelta(seconds=30)
r = op_store.select(ctx.tag, from_ts, to_ts).calc_max_as("max").calc_min_as("min").execute()
logger.info(f'{ r.data["max"] }')
logger.info(f'{ r.data["min"] }')
```

In this example, the values are grouped into periods of 5 seconds and the aggregate values are calculated in these periods:
```python
import datetime
from coiiot_sdk import operational_storage as op_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

to_ts = datetime.datetime.now()
from_ts = to_ts - datetime.timedelta(seconds=30)
r = op_store.select(ctx.tag, from_ts, to_ts).with_period("5s").calc_count_as("count").execute()

logger.info(f'{ r.data[0].value["count"] }') # amount in the first period
logger.info(f'{ r.data[1].value["count"] }') # Quantity in the second period, etc.
```

You can use the sorting of the selection results through the `order_by(**kwargs)` method. So far only sorting by the `time` field is supported.

The example below shows how to get the last two values in order "from the end" for the specified period:
```python
import datetime
from coiiot_sdk import operational_storage as op_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

from_ts = datetime.datetime(2021, 1, 1)
to_ts = datetime.datetime.now()
r = op_store.select(ctx.tag, from_ts, to_ts).with_limit(2).order_by(time="desc").execute()
logger.info(str([rec.value for rec in r.data]))
```
