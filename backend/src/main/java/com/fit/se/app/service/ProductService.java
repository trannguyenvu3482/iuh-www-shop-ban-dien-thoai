package com.fit.se.app.service;

import com.fit.se.app.entity.Product;
import com.fit.se.app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(Integer id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}
