package com.fit.se.app.service;

import com.fit.se.app.common.constant.enums.StatusEnum;
import com.fit.se.app.dto.response.ResponsePaginationDTO;
import com.fit.se.app.dto.response.ResponseProductDTO;
import com.fit.se.app.dto.response.ResponseProductDetailDTO;
import com.fit.se.app.entity.Product;
import com.fit.se.app.mapper.ProductMapper;
import com.fit.se.app.repository.CategoryRepository;
import com.fit.se.app.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public ResponseProductDetailDTO getProductById(Integer id) throws Exception {
        Product product = productRepository.findById(id).orElse(null);

        if (product == null) {
            throw new Exception("Không tìm thấy sản phẩm có id: " + id);
        } else {
            return productMapper.toProductDetailDTO(product);
        }
    }

    public ResponseProductDetailDTO getProductBySlug(String slug) throws Exception {
        Product product = productRepository.findBySlug(slug);

        if (product == null) {
            throw new Exception("Không tìm thấy sản phẩm có slug: " + slug);
        } else {
            return productMapper.toProductDetailDTO(product);
        }
    }

    public ResponsePaginationDTO getProductsByCategory(Integer categoryId, Specification<Product> spec, Pageable pageable) {
        List<Integer> categoriesId = categoryRepository.findAllChildCategoryIds(categoryId);

        if (categoriesId.isEmpty()) {
            System.out.println("categoriesId: " + categoriesId);
            Specification<Product> withCategoryId = (root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("category").get("id"), categoryId);
            spec = spec.and(withCategoryId);
        } else {
            System.out.println("categoriesId: " + categoriesId);
            Specification<Product> withCategoriesId = (root, query, criteriaBuilder) ->
                    root.get("category").get("id").in(categoriesId);
            spec = spec.and(withCategoriesId);
        }

        Page<Product> products = productRepository.findAll(spec, pageable);
        System.out.println("products: " + products);
        return getResponsePaginationDTO(pageable, products);
    }

    private ResponsePaginationDTO getResponsePaginationDTO(Pageable pageable, Page<Product> pageProducts) {
        List<ResponseProductDTO> products = productMapper.toProductDTOs(pageProducts.getContent());

        ResponsePaginationDTO responsePaginationDTO = new ResponsePaginationDTO();
        ResponsePaginationDTO.Metadata metadata = new ResponsePaginationDTO.Metadata();

        metadata.setPage(pageable.getPageNumber() + 1);
        metadata.setPageSize(pageable.getPageSize());
        metadata.setTotalPages(pageProducts.getTotalPages());
        metadata.setTotalItems(pageProducts.getTotalElements());

        responsePaginationDTO.setMetadata(metadata);
        responsePaginationDTO.setResult(products);

        return responsePaginationDTO;
    }

    public ResponsePaginationDTO getProducts(Specification<Product> spec, Pageable pageable, boolean isAdmin) {
        Specification<Product> activeSpec = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("status"), StatusEnum.ACTIVE);
        spec = spec.and(activeSpec);
        Page<Product> pageProducts = productRepository.findAll(activeSpec, pageable);

        return getResponsePaginationDTO(pageable, pageProducts);
    }

    public ResponsePaginationDTO getProducts(Specification<Product> spec, Pageable pageable) {
        Page<Product> pageProducts = productRepository.findAll(spec, pageable);

        return getResponsePaginationDTO(pageable, pageProducts);
    }

    public ResponsePaginationDTO getActiveProducts(Specification<Product> spec, Pageable pageable) {
        Specification<Product> activeSpec = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("status"), StatusEnum.ACTIVE);
        spec = spec.and(activeSpec);
        Page<Product> pageProducts = productRepository.findAll(spec, pageable);

        return getResponsePaginationDTO(pageable, pageProducts);
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}
