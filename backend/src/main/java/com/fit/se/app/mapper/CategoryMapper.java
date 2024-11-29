package com.fit.se.app.mapper;

import com.fit.se.app.dto.response.ResponseCategoryDTO;
import com.fit.se.app.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CategoryMapper {
    Category toCategory(ResponseCategoryDTO responseCategoryDTO);

    ResponseCategoryDTO toCategoryDTO(Category cart);

}