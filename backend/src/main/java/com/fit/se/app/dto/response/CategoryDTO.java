package com.fit.se.app.dto.response;

import lombok.*;

import java.io.Serializable;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO implements Serializable {
    Integer id;
    String name;
    String slug;
    // Setter for parent if needed
    @Setter
    private CategoryDTO parent;  // This is a self-referential field

    // Getter for 'parent' to avoid infinite recursion
    public CategoryDTO getParent() {
        if (this.parent == null) {
            return null;  // Stop recursion if parent is null
        }
        return this.parent;  // Return the parent normally
    }

}