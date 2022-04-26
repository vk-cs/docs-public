The doc / recognize method is used to recognize document fields. This method allows you to recognize, for example, the fields of a passport in a photo. Let's consider its use in more detail below

## Examples of

```
 POST / v1 / doc / recognize HTTP / 1.1
```

...

```
 {"project": "ci_test", "img": [{"link": "http: // localhost: 7799 / normal / v1_text_recognize / pas_90.png", "name": "pas_90.png"}]}
```

## Parameters

- project - the identifier of the project using the recognizer, used to avoid intersections by uid between projects (required for this request);
- img - an array with information about each person (required for this request);
- img.name is the name of the object so that it can be matched with the response (required);
- img.link - if set, the backend will download the file from the link (http or https), otherwise it will search for the image content in the request body.
- callback - if set, the API will respond immediately with a 200 code (if everything is ok with the request), and after the request is completed, it will pull the url (post) specified in the callback field with the results;

## Limitations

- general API restrictions

## Callback example

```
 POST / v1 / doc / recognize HTTP / 1.1
```

...

```
 {"project": "ci_test", "callback": "https://ololo.com", "img": [{"link": "http: // localhost: 7799 / normal / v1_text_recognize / pas_90.png" , "name": "pas_90.png"}]}
```

## Answer: the request was successful

```
 HTTP / 1.1 200 OK

 Content-Length: 9866

 Content-Type: application / json

 Access-Control-Allow-Origin: \*

 {

 "status": 0,

 "objects": [{

 "name": "pas_90.png",

 "status": 0,

 "labels": {

 "birthday": ["02.14.1990"],

 "birthplace": [".", ""],

 "code_of_issue": ["100-106"],

 "date_of_issue": ["12.12.2012"],

 "first_name": [""],

 "last_name": [""],

 "middle_name": [""],

 "number": ["645382", "645382"],

 "place_of_issue": ["", "", ""],

 "series_number": ["0909", "0909"],

 "sex": ["."]

 }

 }

 ]

 }
```

## Answer: errors occurred while processing some objects

```
 HTTP / 1.1 200 OK

 Content-Length: 91

 Content-Type: application / json

 Access-Control-Allow-Origin: \*

 {"status": 0, "objects": [{"name": "plane.jpg", "status": 2, "error": "error read image by link"}]}
```

## Answer: an error occurred during processing

```
 HTTP / 1.1 400 Bad Request

 Content-Length: 61

 Content-Type: application / json

 Access-Control-Allow-Origin: \*

 {"status": 1, "error": "link or content is required", "names": []}
```

## Response options

- status: if 0, then everything is ok. otherwise - an error, the description of the error will be in the "error" field
- objects: information on each loaded object
- objects.name: the name of the object that was specified in the request
- objects.status: 0 - everything is OK, 1 - a permanent error on the server (for example, errors in graphic libraries), 2 - temporary
- error (the request with this picture is worth repeating). error description in objects.error field
- objects.error: if an error occurs while processing an image, then its description will be here
- objects.text: text with photo
