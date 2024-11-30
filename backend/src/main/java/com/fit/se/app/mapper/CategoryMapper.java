package com.fit.se.app.mapper;

import com.fit.se.app.dto.response.ResponseCategoryDTO;
import com.fit.se.app.dto.response.ResponseCategoryNoParentDTO;
import com.fit.se.app.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CategoryMapper {
    Category toCategory(ResponseCategoryDTO responseCategoryDTO);

    ResponseCategoryDTO toCategoryDTO(Category category);

    ResponseCategoryNoParentDTO toCategoryNoParentDTO(Category category);

    List<ResponseCategoryDTO> toCategoryDTOs(List<Category> categories);

    List<ResponseCategoryNoParentDTO> toCategoryNoParentDTOs(List<Category> categories);
}