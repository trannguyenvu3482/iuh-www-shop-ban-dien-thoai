package com.fit.se.app.service;

import com.fit.se.app.dto.response.ResponseCategoryNoParentDTO;
import com.fit.se.app.dto.response.ResponseCategoryWithSubDTO;
import com.fit.se.app.entity.Category;
import com.fit.se.app.mapper.CategoryMapper;
import com.fit.se.app.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public ResponseCategoryWithSubDTO getCategoryById(Integer id) {
        Category currentCategory = categoryRepository.findById(id).orElse(null);
        if (currentCategory == null) {
            throw new IllegalArgumentException("Không tìm thấy danh mục có id: " + id);
        }
        ResponseCategoryNoParentDTO responseCategoryDTO = categoryMapper.toCategoryNoParentDTO(currentCategory);

        List<Integer> categoryIds = categoryRepository.findAllChildCategoryIds(id);

        List<Category> childCategories = categoryRepository.findByIdIn(categoryIds);
        List<ResponseCategoryNoParentDTO> responseCategoryDTOs = categoryMapper.toCategoryNoParentDTOs(childCategories);

        ResponseCategoryWithSubDTO responseCategoryWithSubDTO = new ResponseCategoryWithSubDTO();
        responseCategoryWithSubDTO.setCategory(responseCategoryDTO);
        responseCategoryWithSubDTO.setSubCategories(responseCategoryDTOs);

        return responseCategoryWithSubDTO;
    }

}
