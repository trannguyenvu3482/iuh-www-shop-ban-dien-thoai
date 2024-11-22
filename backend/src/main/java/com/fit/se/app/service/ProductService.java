package com.fit.se.app.service;

import com.fit.se.app.dto.response.Metadata;
import com.fit.se.app.dto.response.ProductDTO;
import com.fit.se.app.dto.response.ResPaginationDTO;
import com.fit.se.app.entity.Product;
import com.fit.se.app.mapper.ProductMapper;
import com.fit.se.app.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public ProductDTO getProductById(Integer id) throws Exception {
        Product product = productRepository.findById(id).orElse(null);

        if (product == null) {
            throw new Exception("Không tìm thấy sản phẩm có id: " + id);
        } else {
            return productMapper.toProductDTO(product);
        }
    }

    public ResPaginationDTO getProducts(Specification<Product> spec, Pageable pageable) {
        Page<Product> pageProducts = productRepository.findAll(spec, pageable);

        List<ProductDTO> products = productMapper.toProductDTOs(pageProducts.getContent());

        ResPaginationDTO resPaginationDTO = new ResPaginationDTO();
        Metadata metadata = new Metadata();

        metadata.setPage(pageable.getPageNumber() + 1);
        metadata.setPageSize(pageable.getPageSize());
        metadata.setTotalPages(pageProducts.getTotalPages());
        metadata.setTotalItems(pageProducts.getTotalElements());

        resPaginationDTO.setMetadata(metadata);
        resPaginationDTO.setResult(products);

        return resPaginationDTO;
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}
