# coffee-city

Coffee Project > City microservice

## Standards
- Language: `TS`
- Eslint: `Yes`
- Static Code Analysis: `Yes` *IntelliJ Code Inspections*
- DDD - Document Driven: `Yes`
- DDD - Domain Driven: `Yes`
- EDD - Exception Driven: `Yes`
- TDD - Test Driven: `Yes` [unit tests](./test)
- LDD - Log Driven: `Yes`
- 12FA - 12 Factor-App: `50%` *Partially*

## Commands
- `npm run clear` *// clears "dist" folder*
- `npm run lint` *// runs eslint for static code analysis*
- `npm run build` *// builds JS files at "dist" folder*
- `npm run test` *// runs test files in "test" folder*
- `npm run start` *// starts web server*
- `npm run test:watch` *// runs test files in "test" folder*
- `npm run test:coverage` *// runs test files in "test" folder*
- `npm run run:js` *// direct run from dist without build*
- `npm run run:ts` *// direct run from src without build*

## Dependencies
- `@nestjs/common` *core nestjs utilities*
- `@nestjs/core` *core nestjs component*
- `@nestjs/mongoose` *core mongodb client*
- `@nestjs/platform-express` *core express component*
- `@nestjs/swagger` *core open-api component*
- `@nestjs/testing` *core test component*
- `@yelmer-samples/coffee-shared` *shared project data models*
- `axios` *http request*
- `cron` *to initialize cron jobs*
- `dotenv` *to read environment*
- `mongoose` *mongodb client*
- `reflect-metadata` *reflection*
- `rimraf` *clears dist*
- `rxjs` *handles header keys*
- `swagger-ui-express` *swagger ui*
- `uuid` *to generate uuid*

## OpenAPI
> All endpoints, dto(models) and entities are documented
> 
> Authentication (ApiKey style) was implemented
>
- [OpenAPI Interface / Swagger UI](http://localhost:8090/docs)
- `apiKey` : click security and fill it as `0e214071-09b5-4cd3-841d-bdc19febe9c9`

## Endpoints

- `GET` `/v1/cities` *Lists cities with short info and ordered by name*
- `POST` `/v1/cities` *Creates a city if name is valid and not-existed*
- `DELETE` `/v1/cities/:id` *Deletes a city if existed*
- `GET` `/v1/cities/weather` *Lists cities with detailed info and ordered by name*
- `GET` `/v1/cities/:name/weather` *Fetches a city with detailed weather and historical weathers*
- `GET` `/v1/cities/m2m/list` *Lists cities with id and name*
- `GET` `/v1/cities/m2m/:id` *Fetches a city with id and name #todo*

## Postman
> At environment panel, you should set {{host}} and {{apiKey}}
> 
> **@TODO**
>
- `host` : `http://localhost:8090/`
- `apiKey` : `0e214071-09b5-4cd3-841d-bdc19febe9c9` - *to basic M2M security*
- [Postman Collection Export](./assets/coffee-city.postman_collection.json)
- [Postman Environment Export](./assets/coffee-city.postman_environment.json)

---
### Prepared by
- Mustafa Yelmer
- mustafayelmer(at)gmail.com
- `2021-10-10`