package com.fit.se.app.controller;

import com.fit.se.app.common.annotation.ApiMessage;
import com.fit.se.app.dto.response.ResponseCategoryWithSubDTO;
import com.fit.se.app.dto.response.ResponsePaginationDTO;
import com.fit.se.app.entity.Product;
import com.fit.se.app.service.CategoryService;
import com.fit.se.app.service.ProductService;
import com.turkraft.springfilter.boot.Filter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final ProductService productService;

    public CategoryController(CategoryService categoryService, ProductService productService) {
        this.categoryService = categoryService;
        this.productService = productService;
    }

    @GetMapping("/{id}/products")
    @ApiMessage("Get products by category id")
    ResponseEntity<ResponsePaginationDTO> getProductsByCategory(@PathVariable Integer id, @Filter Specification<Product> spec, Pageable pageable) {
        return ResponseEntity.ok(productService.getProductsByCategory(id, spec, pageable));
    }

    @GetMapping("/{id}")
    @ApiMessage("Get category by id")
    ResponseEntity<ResponseCategoryWithSubDTO> getCategoryById(@PathVariable Integer id) {
        ResponseCategoryWithSubDTO category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }
}
