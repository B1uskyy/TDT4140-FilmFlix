package no.ntnu.stud.gr55;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
@SpringBootApplication
public class BackendService {

    public BackendService() {}
    public static void main(final String[] args) {
        SpringApplication.run(BackendService.class, args);
    }
}
