package com.fit.se.app.controller;

import com.fit.se.app.common.annotation.ApiMessage;
import com.fit.se.app.dto.response.ResponsePaginationDTO;
import com.fit.se.app.dto.response.ResponseProductDetailDTO;
import com.fit.se.app.entity.Product;
import com.fit.se.app.service.ProductService;
import com.turkraft.springfilter.boot.Filter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @ApiMessage("Create a product")
    ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @GetMapping
    @ApiMessage("Get all products")
    ResponseEntity<ResponsePaginationDTO> getProducts(@Filter Specification<Product> spec, Pageable pageable) {
        return ResponseEntity.ok(productService.getProducts(spec, pageable));
    }


    @GetMapping("/{id}")
    @ApiMessage("Get a product by id")
    ResponseEntity<ResponseProductDetailDTO> getProductById(@PathVariable Integer id) throws Exception {
        ResponseProductDetailDTO product = productService.getProductById(id);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    @GetMapping("/slug/{slug}")
    @ApiMessage("Get a product by slug")
    ResponseEntity<ResponseProductDetailDTO> getProductBySlug(@PathVariable String slug) throws Exception {
        ResponseProductDetailDTO product = productService.getProductBySlug(slug);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    @PutMapping
    @ApiMessage("Update a product")
    ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        Product updatedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete a product by id")
    ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

}
