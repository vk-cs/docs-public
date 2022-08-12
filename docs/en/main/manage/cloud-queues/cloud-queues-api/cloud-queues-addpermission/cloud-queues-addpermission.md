Adds a permission to the queue for a specific participant. This allows you to share access to the queue.

When you create a queue, you have full access rights to it. Only you, the queue owner, can grant or deny permissions to the queue.

## Request Parameters

**ActionName.N**

The action that the client wants to allow for the specified principal. Acceptable values: the name of any action or `\*'.

Specifying 'SendMessage`, 'deleteMessage' or 'ChangeMessageVisibility' for 'actionName.n' also grants access rights for the corresponding batch versions of these actions: 'SendMessageBatch`, 'DeleteMessageBatch`, and 'ChangeMessageVisibilityBatch'.

Type: array of strings

Required: Yes

**AWSAccountId.N**

The VK Cloud account number of the principal (the principal is a user, service, or account that receives the permissions defined in the policy) that has been granted permission. The customer must have an VK Cloud account, but must not be registered in Cloud Queues.

Type: array of strings

Required: Yes

**label**

The unique identifier of the permission you are setting (for example `'AliceSendMessage'`). Maximum of 80 characters. Allowed characters include alphanumeric characters, hyphens ('-') and underscores ('\_').

Type: String

Required: Yes

**QueueUrl**

VK Cloud Queues, to which permissions are added.

URLs and queue names are case-sensitive.

Type: String

Required: Yes

## Mistakes

**OverLimit**

The specified action reports a violation of the limit. For example` 'ReceiveMessage' returns this error if the maximum number of messages has been reached, and 'AddPermission' returns this error if the maximum number of queue permissions has been reached.

HTTP Status Code: 403

## Examples

### [](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html)

#### Sample request

```
https://sqs.mcs.mail.ru/123456789012/MyQueue/
?Action=AddPermission
&Label\=MyLabel
&AWSAccountId.1\=123456789012
&ActionName.1\=SendMessage
&AWSAccountId.2\=210987654321
&ActionName.2\=ReceiveMessage
&Expires=2020-04-18T22:52:43PST
&Version=2012-11-05
&AUTHPARAMS
```

#### Sample response

```
<AddPermissionResponse\>    
<ResponseMetadata\>       
<RequestId\>9a285199-c8d6-47c2-bdb2-314cb47d599d</RequestId\>    
</ResponseMetadata\>
</AddPermissionResponse\>
```
