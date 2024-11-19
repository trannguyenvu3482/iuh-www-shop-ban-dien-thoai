package com.fit.se.app.service;

import com.fit.se.app.entity.Product;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductService {
    private final ProductService productService;

    public ProductService(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    List<Product> getProducts() {
        return productService.getProducts();
    }
}
