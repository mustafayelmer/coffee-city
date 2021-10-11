# Geri Medica - Sample

Basic File Upload Project

## Standards
- Language: `TS`
- Eslint: `Yes`
- Static Code Analysis: `Yes` *IntelliJ Code Inspections*
- DDD - Document Driven: `Yes`
- DDD - Domain Driven: `Yes`
- EDD - Exception Driven: `Yes`
- TDD - Test Driven: `Yes` [go to test folder](./test/)
- LDD - Log Driven: `No`
- 12FA - 12 Factor-App: `50%` *Partially*

## Commands
- ``npm run clear`` *// clears "dist" folder*
- ``npm run lint`` *// runs eslint for static code analysis*
- ``npm run test`` *// runs test files in "test" folder*
- ``npm run build`` *// builds JS files at "dist" folder*
- ``npm run test`` *// run tests*
- ``npm run start`` *// starts web server*

## Dependencies
- ``alasql`` *in memory db*
- ``express`` *provides as web server*
- ``csv-string`` *parses string to array of objects*
- ``express-fileupload`` *file upload middleware, parse file data from header*
- ``dotenv`` *reads environment*
- ``cors`` *provides CORS*
- ``body-parser`` *handles body by header*
- ``helmet`` *handles header keys*


## Postman
> You can find Postman export file at [go to asset folder](./assets/) 

## Config
> You can use `host` as `http://localhost:8080/v1` 

## Samples

### Upload
> Uploads a csv file
>
| Type | Value |
| ---- | --- |
| Method | POST |
| Endpoint | `host`/upload |
| Payload | File Object |
| Response | UploadedFileInfo |

> Sample Endpoint
>
`POST` `http://localhost:8080/upload`
> Sample Payload
>
`Browse file`
> Sample Response
````json
{
    "mimetype": "text/csv",
    "size": 1571,
    "name": "exercise.csv"
}
````

> Throws
> EmptyFileError, InvalidCsvLinesError, InvalidFileError



### Size
> Returns row count, ie: SELECT COUNT(*) FROM TABLE
>
| Type | Value |
| ---- | --- |
| Method | GET |
| Endpoint | `host`/size |
| Payload | *none* |
| Response | CountResponse |
> Sample Endpoint
>
`GET` `http://localhost:8080/count`
> Sample Response
````json
{
    "count": 18
}
````

### Fetch All
> Returns all rows
>
| Type | Value |
| ---- | --- |
| Method | GET |
| Endpoint | `host`/all |
| Payload | *none* |
| Response | Array<Record<string, unknown> |
> Sample Endpoint
>
`GET` `http://localhost:8080/all`
> Sample Response
````json
[
    {
        "source": "ZIB",
        "codeListCode": "ZIB001",
        "code": "271636001",
        "displayValue": "Polsslag regelmatig",
        "longDescription": "The long description is necessary",
        "fromDate": "01-01-2019",
        "toDate": "",
        "sortingPriority": "1"
    },
    {
        "source": "ZIB",
        "codeListCode": "ZIB001",
        "code": "61086009",
        "displayValue": "Polsslag onregelmatig",
        "longDescription": "",
        "fromDate": "01-01-2019",
        "toDate": "",
        "sortingPriority": "2"
    }
]
````

### Find by Code
> Returns row by code
>
| Type | Value |
| ---- | --- |
| Method | GET |
| Endpoint | `host`/fetch/:code |
| Payload | *none* |
| Response | ModeResponse |
> Sample Endpoint
>
`GET` `http://localhost:8080/fetch/271636001`
> Sample Response
````json
{
    "source": "ZIB",
    "codeListCode": "ZIB001",
    "code": "271636001",
    "displayValue": "Polsslag regelmatig",
    "longDescription": "The long description is necessary",
    "fromDate": "01-01-2019",
    "toDate": "",
    "sortingPriority": "1"
}
````
> Throws
> InvalidCodeError, EmptyCodeError, EmptyCodeError


### Delete All
> Deletes all record
>
| Type | Value |
| ---- | --- |
| Method | GET |
| Endpoint | `host`/delete-all |
| Payload | *none* |
| Response | SizeResponse |
> Sample Endpoint
>
`DELETE` `http://localhost:8080/delete-all`
> Sample Response
````json
{
    "count": 18
}
````

---
### Prepared by
- Mustafa Yelmer
- mustafayelmer(at)gmail.com
- `2021-09-27`