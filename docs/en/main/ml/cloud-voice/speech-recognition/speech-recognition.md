There are two types of speech recognition available:

- recognition of audio files;
- recognition of streaming audio.

## Recognize audio files

To recognize speech from an audio file, send the audio file in the body of the POST request to [https://voice.mcs.mail.ru/asr](https://voice.mcs.mail.ru/asr), specifying the correct `Content -Type` in header.

Request example:

```bash
curl -L --request POST 'https://voice.mcs.mail.ru/asr'
--header 'Content-Type: audio/ogg; codecs=opus'
--header 'Authorization: Bearer xxxxxxxxxx'
--data-binary '@/Users/User/tts.ogg'
```

Answer example:

```json
{
	"qid": "0ac6294a351d42ad859404ecd349e4b9",
	"result": {
		"texts": [
			{
				"text": "hello alice",
				"confidence": 1.0,
				"punctuated_text": "Hello, Alice."
			}
		],
		"phrase_id": "20220921-1515-4d75-92b4-24b6c101ba6a"
	}
}
```

### Supported audio formats

| container | Codec | content-type          |
| --------- | ----- | --------------------- |
| WAV       | —     | audio/wave            |
| ogg       | Opus  | audio/ogg codecs=opus |

### Restrictions

| Restriction                | Meaning |
| -------------------------- | ------- |
| Maximum audio file size    | 20 Mb   |
| Maximum audio duration     | 5 min   |
| Maximum number of channels | 1       |

### Error codes

| Code | Status | Description                                   |
| ---- | ------ | --------------------------------------------- |
| 4009 | 400    | Audio size too big                            |
| 4033 | 400    | Unknown audio format                          |
| 4034 | 400    | Audio is corrupted or in an unexpected format |
| 4043 | 400    | Too long audio                                |
| 4044 | 400    | Unsupported number of audio channels          |
| 4045 | 400    | Unsupported audio sample rate                 |
| 4048 | 400    | Invalid token                                 |
| 4049 | 400    | Inactive project VK Cloud                        |

## Recognize streaming audio

To recognize a chunk (small piece of speech), you need to send a request to create a task. After that, it will be possible to send chunks and receive the final result.

### Request to create a task

In order to create a task, it is enough to send a POST request to https://voice.mcs.mail.ru/asr_stream/create_task with an authorization header with `access_token`, the response will be `task_id`, `task_token`.

Request example:

```bash
curl --request POST \
  --url https://voice.mcs.mail.ru/asr_stream/create_task
  --header 'Authorization: Bearer access_tokenxxxxxxxx'
```

Answer example:

```json
{
  "qid": "61b5cf067c494b4a9a0b87a3c43e37ef",
  "result": {
    "task_id": "05ad987e-ceee-4186-acdb-956148b91692",
    "task_token": "040b2fcfc3d9b9806b691070e873125dfc0450a8251887ba91b19be08eb3951c"
  }
}
```

### Request to send a chunk

A chunk is an audio fragment of the selected format, respectively, headers must be present in each chunk.

To send a chunk, all you need to do is:

- send a POST request to https://voice.mcs.mail.ru/asr_stream/add_chunk, passing in the `Authorization-task_token` header;
- pass `task_id` and `chunk_num` in GET parameters (numbering starts from `0`);
- specify the correct `Content-Type` in the request header.
- a chunk is sent in the request body, which is an array of bytes in `wav` or `ogg` format.

The response will be the result of chunk recognition.

Request example:

```bash
curl --request POST \
  --url 'https://voice.mcs.mail.ru/asr_stream/add_chunk?task_id=xxxxx&chunk_num=2' \
  --header 'Authorization: Bearer task_tokenxxxxxxxx' \
  --header 'Content-Type: audio/wave' \
  --data 'xxxxxxxxxx'
```

Answer example:

```json
{
  "qid": "4d44cb0eb81f4e7f84a7997ec4f2f3c4",
  "result": {
    "text": "hello marusya"
  }
}
```

<warn>

The interval between sending chunks should not exceed 5 seconds, after that the task goes into `done` status and it will be impossible to continue sending chunks.

Chunks themselves must be sent sequentially and synchronously.

</warn>

<err>

For the last chunk, you need to pass a GET-parameter with the value `last=1`.

</err>

#### Supported audio formats

| Container | Codek | Content type          |
| --------- | ----- | --------------------- |
| WAV       | —     | audio/wave            |
| ogg       | Opus  | audio/ogg codecs=opus |

## Restrictions

| Restriction                | Meaning |
| -------------------------- | ------- |
| Maximum chunk size         | 32100 B |
| Maximum chunk duration     | 1 s     |
| Maximum number of channels | 1       |
| Minimum number of chunks   | 5       |

<info>

The recommended chunk length is 0.08 seconds.

</info>

### Request to get the end result of the task

At any time after sending chunks, you can get the result, for this you need to send a GET request to https://voice.mcs.mail.ru/asr_stream/get_result, passing `Authorization-task_token` in the header, `task_id` in the GET parameters.

The response will include the recognition result with the current status of the task.

Request example:

```bash
curl --request GET \
  --url 'https://voice.mcs.mail.ru/asr_stream/get_result?task_id=xxxxx' \
  --header 'Authorization: Bearer task_tokenxxxxxxxx' \
```

Answer example:

```json
{
  "qid": "517e5ba9f4a9465c9d73778bedac0808",
  "result": {
    "text": "hello marusya hello marusya",
    "status": "done"
  }
}
```
