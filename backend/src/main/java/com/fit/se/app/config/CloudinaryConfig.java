package com.fit.se.app.config;

import com.cloudinary.Cloudinary;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary config() {
        File f = new File(".env");
        String url = "";
        if (f.exists()) {
            Dotenv dotenv = Dotenv.load();
            url = dotenv.get("CLOUDINARY_URL");
        } else {
            url = System.getenv("CLOUDINARY_URL");
        }
        System.out.println("CLOUDINARY_URL: " + url);
        return new Cloudinary(url);
    }
}
