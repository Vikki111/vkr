package vkrgrapheditor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

//@SpringBootApplication
//public class SpringBootWebApplication extends SpringBootServletInitializer {
//
//    @Override
//    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//        return application.sources(SpringBootWebApplication.class);
//    }
//
//    public static void main(String[] args) throws Exception {
//        SpringApplication.run(SpringBootWebApplication.class, args);
//    }
//}

@SpringBootApplication
@EnableWebMvc
public class SpringBootWebApplication extends WebMvcAutoConfiguration {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootWebApplication.class, args);
    }

}