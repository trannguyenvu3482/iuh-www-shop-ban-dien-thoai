package com.fit.se.app.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Metadata {
    int page;
    int pageSize;
    int totalPages;
    long totalItems;
}
