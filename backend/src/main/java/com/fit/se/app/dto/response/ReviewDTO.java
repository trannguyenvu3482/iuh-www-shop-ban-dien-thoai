package com.fit.se.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link com.fit.se.app.entity.Review}
 */
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO implements Serializable {
    Integer id;
    ReviewUserDTO user;
    Integer rating;
    String comment;
    Instant createdAt;
    Instant updatedAt;

    @Builder
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewUserDTO implements Serializable {
        Integer id;
        String name;
        String email;
    }
}