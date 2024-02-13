# Sample backend
Environment for backend development using Spring Boot with Java.

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