package com.fit.se.app.config;

import com.cloudinary.Cloudinary;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary config() {
        Dotenv dotenv = Dotenv.load();
        String url = dotenv.get("CLOUDINARY_URL");
        System.out.println("CLOUDINARY_URL: " + url);
        return new Cloudinary(url);
    }
}
