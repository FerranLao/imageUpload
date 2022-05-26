
## Installation

  

```bash

$ npm install

```

  

## Running the app

  

```bash

# development

$ npm run start

  

# watch mode

$ npm run start:dev

  

# production mode

$ npm run start:prod

```

  

## Test

  

```bash

# unit tests

$ npm run test
```

## API

```http
GET /task/:taskId
```
recieves the Id and returns the corresponding task

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `taskId` | `ObjectId` |_id of the resource to fetch|

response:
```javascript
{
"_id": "628e76afe3e78c11b91ce7b7",
"path": "/Users/.../output/800/3a17db08792cbd5ef6635cee72cec602.jpg", //only in status 'DONE'
"status": "DONE",
"error": 'Error MESSAGE'// only with status:error
"createdAt": "2022-05-25T18:34:23.384Z",
"updatedAt": "2022-05-25T18:34:23.452Z",
"__v": 0
}
```
##
```http
POST /task
```
Creates a task to resize and store the image, and trigger to all available resolutions (800, 1024).
-   Request body must be a multipart request with a part named "file" containing file data.

Response:
```javascript
{

"path": "/Users/ferranlao/tecnicaParadigma/tecnica-paradigma/output/0000003057_15_1_1.jpeg/800",

"status": "PENDING",

"_id": "628f3d81da79b597d2af4393",

"createdAt": "2022-05-26T08:42:41.846Z",

"updatedAt": "2022-05-26T08:42:41.846Z",

"__v": 0

},

{

"path": "/Users/ferranlao/tecnicaParadigma/tecnica-paradigma/output/0000003057_15_1_1.jpeg/1024",

"status": "PENDING",

"_id": "628f3d81da79b597d2af4394",

"createdAt": "2022-05-26T08:42:41.846Z",

"updatedAt": "2022-05-26T08:42:41.846Z",

"__v": 0

}
```

