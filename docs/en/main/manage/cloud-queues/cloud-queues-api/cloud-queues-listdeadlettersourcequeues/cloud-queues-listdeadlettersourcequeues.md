The request returns a list of your queues for which the RedrivePolicy attribute of the queue is configured using the undelivered message queue.

The method supports pagination. Set the maxResults parameter in the request to specify the maximum number of results returned in the response. If maxResults is not set, the response will contain no more than 1000 results. If you have set maxResults and there are additional results to display, the response will contain a value for nextToken. Use nextToken as a parameter in the listdeadlettersourcequeues request to get the next page of results.

Request Parameters
-----------------

MaxResults

The maximum number of results to include in the response. The range of values is from 1 to 1000. You must set maxResults to get the nextToken value in the response.

Type: Integer

Required: No

NextToken

Pagination token for requesting the next set of results.

Type: String

Required: No

QueueUrl

The URL of the undelivered message queue.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

Response Elements
---------------

The following items are returned by the service.

NextToken

Pagination token to include in the next request. The token value is null if there are no additional results for the request or if you did not specify maxResults in the request.

Type: String

QueueUrl.N

A list of source queue URLs for which the redrivepolicy queue attribute is configured using the undelivered message queue.

Type: array of strings

Mistakes
------

AWS.SimpleQueueService.NonExistentQueue

The specified queue does not exist.

HTTP Status Code: 400

Examples
-------

The following sample request request returns a list of the original queues of undelivered messages. In this example, only one MySourceQueue source queue is configured with an undelivered message queue. The AUTHPARAMS structure depends on the API request signature. 

#### Sample request

```
?Action=ListDeadLetterSourceQueues
&Expires=2020-12-12T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<ListDeadLetterSourceQueuesResponse xmlns="https://queue.amazonaws.com/doc/2012-11-05/">
    <ListDeadLetterSourceQueuesResult>
        <QueueUrl>https://sqs.us-east-2.amazonaws.com/123456789012/MySourceQueue</QueueUrl>
    </ListDeadLetterSourceQueuesResult>
    <ResponseMetadata>
        <RequestId>8ffb921f-b85e-53d9-abcf-d8d0057f38fc</RequestId>
    </ResponseMetadata>
</ListDeadLetterSourceQueuesResponse>
```