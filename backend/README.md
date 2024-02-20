# Sample backend
Environment for backend development using Spring Boot with Java.

## Setup
### Start the database
```bash
docker-compose run db
```
To load the database:
```bash
docker-compose run load_db
```
(alternatively, to manually download and parse from IMDB, run `docker-compose run populate_db`)

### Making Posters work
Posters are not part of the IMDB API, and are therefore fetched from OMDB.
To use the OMDB API, you need to get an API key from [OMDB](http://www.omdbapi.com/apikey.aspx).
Get a key, and put in in the `.env` file.

## Manually entering environment
Enter the environment with the following command:
```bash
docker-compose run env
```

To start the application
```bash
mvn spring-boot:run
```

To run the tests
```bash
mvn test
```

## Automatically entering environment
To run the Spring-Boot server
```bash
docker-compose run backend
```