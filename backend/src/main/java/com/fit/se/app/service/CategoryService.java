package com.fit.se.app.service;

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

    public List<Integer> getCategoryById(Integer id) {
        return categoryRepository.findAllChildCategoryIds(id);
//        Category category = categoryRepository.findById(id).orElse(null);
//        if (category == null) {
//            throw new IllegalArgumentException("Không tìm thấy danh mục có id: " + id);
//        } else {
//            return categoryMapper.toCategoryDTO(category);
//        }
    }

}
