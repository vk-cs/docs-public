The cause of the error when creating a virtual desktop can be found in the Cloud Desktop service logs or in the event log.

## Diagnostics using service logs

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Monitoring → Logging**.
1. If the query and filter fields are not displayed on the screen, click the **Search and filters** button.
1. Specify search parameters:

    - Query field: enter `stream_id: "worker"`.
    - **Status**: select `Error`.
    - **Service**: select `VDI`.
    - Time interval: set it to cover the time when the error occurred.

1. Click the **Search** button.
1. In the search results list, click on the line with the required event.

    A window with event data will open. The error description is contained in the **Message** field. Example:

    ```json
    Server error detected. Code: 500; Message: "Build of instance bcb5e979-XXXX-1d57281a282f aborted: Failed to allocate the network(s) with error No fixed IP addresses available for network: 070b51d8-XXXX-7a786c779c9e, not rescheduling."
    ```

## Diagnostics using event log

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Monitoring → Event log**.
1. If the query and filter fields are not displayed on the screen, click the **Search and filters** button.
1. Specify search parameters:

    - Query field: leave blank.
    - **Status**: select `Error`.
    - **Source**: leave blank.
    - Time interval: set it to cover the time when the error occurred.

1. Click the **Search** button.
1. In the search results list, click on the line with the required event.

    A window with event data will open. The error description is contained in the **Response body** field. Example:

    ```json
    {
      "badRequest":{
        "message": "Volume is smaller than the minimum size specified in image metadata. Volume size is 13958643712 bytes, minimum size is 42949672960 bytes.", 
        "code": 400
      }
    }
    ```
