This module contains the `get_http_connector(name)` function, which is needed to get the HTTP connector object.

The HTTP connector allows you to make requests to external systems.
```python
class BadParamsError(Exception):
    pass

class ConnectorNotFoundError(Exception):
    pass

class UnknownError(Exception):
    pass

class NonHTTPConnectorError(Exception):
    pass


def get_http_connector(name: str) -> HTTPConnector:
	pass
```

The HTTP connector allows you to make `get`, `post`, `put`, `patch`, `delete` requests to external systems:
```python
Headers = Dict[str, str]
Params = Dict[str, str]


class HTTPResponse:
	status_code:  int
	headers:      Headers
	text:         str
	json:         Any

class HTTPConnector:

    def get(self,
            path: Union[str, None] = None,
            params: Union[Params, None] = None,
            headers: Union[Headers, None] = None) -> HTTPResponse:

        pass


    def post(self,
             path: Union[str, None] = None,
             data: Union[Any, None] = None,
             headers: Union[Headers, None] = None) -> HTTPResponse:

        pass


    def put(self,
            path: Union[str, None] = None,
            data: Union[Any, None] = None,
            headers: Union[Headers, None] = None) -> HTTPResponse:

        pass


    def patch(self,
              path: Union[str, None] = None,
              data: Union[Any, None] = None,
              headers: Union[Headers, None] = None) -> HTTPResponse:

        pass


    def delete(self,
               path: Union[str, None] = None,
               headers: Union[Headers, None] = None) -> HTTPResponse:

        pass
```
An example of using an HTTP connector:
```python
from coiiot_sdk import connectors, context

connector = connectors.get_http_connector("custom-resource")

ctx = context.current()
connector.get(path=f"/v1/clients/{ctx.msg.value}/root_tag")
```
