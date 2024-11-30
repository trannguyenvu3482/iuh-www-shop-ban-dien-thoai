package com.fit.se.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCategoryWithSubDTO {
    private ResponseCategoryNoParentDTO category;
    private List<ResponseCategoryNoParentDTO> subCategories;

}
