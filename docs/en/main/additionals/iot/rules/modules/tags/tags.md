Module `tags` Provides the following functions:
```python
def root() -> Tag:
  """
  Getting root tag
  """

def get(tag_id: int) -> Tag:
  """
  Getting a tag on it id
  """

def get_child_by_name(tag_id: int, name: str) -> Tag:
  """
  Getting a descendant with name name for tag with id = tag_id
  """

def select_by_type(tag_type: TagTypeEnum) -> Iterator[Tag]:
  """
  Sample tag by type
  """
```

The module also contains error classes that may occur upon receipt of tags:
```python
class TagNotFoundError(Exception):
    pass

class BadParamsError(Exception):
    pass

class UnknownError(Exception):
    pass
```

An example of working with these functions:
```python
from coiiot_sdk import tags

root_tag = tags.root() # Getting root tag

tag = None
tag_id = 100
try:
  tag = tags.get(tag_id) # Getting tag S. id=100
except tags.TagNotFoundError:
  pass

if tag is not None:
  # Get a descendant with the name imchild у тега с id = 100
  child_tag = tags.get_child_by_name(tag_id, "imchild") 
```
