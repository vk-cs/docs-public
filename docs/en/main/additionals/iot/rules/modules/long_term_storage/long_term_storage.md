## Description

Let's consider work with storage `Long Term Storage`. Working with persistent storage is very similar to working with `Operational Storage`.

The `coiiot_sdk.long_term_storage` module defines the following functions and error classes:
```python
class BadParamsError(Exception):
    pass

class NotFoundError(Exception):
    pass

class SelectionError(Exception):
    pass

class InsertionError(Exception):
    pass

class UpsertionError(Exception):
    pass

class SQLError(Exception):
    pass


def insert() -> Insert:
	pass

def upsert() -> Upsert:
	pass

def select_latest(tag: Tag) -> SelectLatest:
	pass

def select_current(tag: Tag) -> SelectCurrent:
	pass

def select(tag: Tag, from_ts: datetime, to_ts: datetime) -> Select:
	pass
```

`Long Term Storage` has one distinct difference from `Operational Storage:` `select(tag, from_ts, to_ts)` only supports periodization for the following periods:
```python
def with_period_minute(self) -> 'Select':
	pass

def with_period_hour(self) -> 'Select':
	pass

def with_period_day(self) -> 'Select':
	pass

def with_period_month(self) -> 'Select':
	pass

def with_period_year(self) -> 'Select':
	pass
```

## Event

The `insert()` call returns an `Insert` object with the following interface:
```python
class InsertT:
    def value(self, tag_id: int, value: Any, timestamp: datetime):
		pass

    def msg(self, msg: MessageT):
		pass
```
The `value(tag_id, value, timestamp)` method is for inserting a specific value. To insert a value from a message, you can use the `msg(message)` method:
```python
from coiiot_sdk import long_term_storage as lt_store, context

ctx = context.current()

# Save the received message to the repository
lt_store.insert().msg(ctx.msg)
```

## Getting the last value of a tag

Here everything is similar to working with `Operational Storage`. Calling `select_latest(tag)` returns an object of class `SelectLatest` with a single method `execute()`.
An example of getting the last value of the current tag:
```python
from coiiot_sdk import long_term_storage as lt_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

latest = lt_store.select_latest(ctx.tag).execute()
logger.info(f'{ latest.data.value }')
```

## Aggregate

Calling `upsert()` returns an `Upsert` object with the following interface:
```python
class UpsertT:
    def value(self, tag_id: int, value: Any, timestamp: datetime):
		pass

    def msg(self, msg: MessageT):
		pass
```

The `value(tag_id, value, timestamp)` method is for inserting with updating a specific value.

To insert and update a value from a message, you can use the `msg(message)` method:
```python
from coiiot_sdk import long_term_storage as lt_store, context

ctx = context.current()

# Save the received message to the repository
lt_store.upsert().msg(ctx.msg)
```

## Getting the current value of a tag

Here everything is similar to working with `Operational Storage`. Calling `select_current(tag)` returns an object of class `SelectCurrent` with a single method `execute()`.

An example of getting the current value of the current `aggregate` type tag:
```python
from coiiot_sdk import long_term_storage as lt_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

current = lt_store.select_current(ctx.tag).execute()
logger.info(f'{ current.data.value }')
```

## Getting values from Long Term Storage

Similar to working with `Operational Storage`, even the `SelectionResult` class has the same definition.

Here is just an example of aggregation over a period of one minute in `Long Term Storage`:
```python
import datetime
from coiiot_sdk import long_term_storage as lt_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

to_ts = datetime.datetime.now()
from_ts = to_ts - datetime.timedelta(minutes=30)
r = lt_store.select(ctx.tag, from_ts, to_ts).with_period_minute().calc_count_as("count").execute()
logger.info(f'{ r.data[0].value["count"] }') # amount in the first period
logger.info(f'{ r.data[1].value["count"] }') # Quantity in the second period, etc.
```
