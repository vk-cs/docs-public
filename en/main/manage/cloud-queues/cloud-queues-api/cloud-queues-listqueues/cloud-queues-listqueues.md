Returns a list of your queues in the current region. The answer includes no more than 1000 results. If you specify a value for the optional QueueNamePrefix parameter, only queues with a name that starts with the specified value will be returned.

The method supports pagination. Set the maxResults parameter in the request to specify the maximum number of results returned in the response. If maxResults is not set, the response will contain no more than 1000 results. If you have set maxResults and there are additional results to display, the response will contain a value for nextToken. Use nextToken as a parameter in the next request, listQueues, to get the next page of results.

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

QueueNamePrefix

The string used to filter the results of the list. Only those queues whose name starts with the specified string are returned.

URLs and queue names are case-sensitive.

Type: String

Required: No

Response Elements
---------------

The following items are returned by the service.

NextToken

Pagination token to include in the next request. The token value is null if there are no additional results for the request or if you did not specify maxResults in the request.

Type: String

QueueUrl.N

A list of queue URLs, up to 1000 entries, or the maxResults value you sent in the request.

Type: array of strings

Examples
-------

The following sample request request returns queues whose names begin with the letter t. The structure of AUTHPARAMS depends on the signature of the API request. 

#### Sample request

```
https://sqs.ru-east-2.mcs.mail.ru/
?Action=ListQueues
&QueueNamePrefix=M
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<ListQueuesResponse>
    <ListQueuesResult>
        <QueueUrl>https://sqs.us-east-2.amazonaws.com/123456789012/MyQueue</QueueUrl>
    </ListQueuesResult>
    <ResponseMetadata>
        <RequestId>725275ae-0b9b-4762-b238-436d7c65a1ac</RequestId>
    </ResponseMetadata>
</ListQueuesResponse>
```