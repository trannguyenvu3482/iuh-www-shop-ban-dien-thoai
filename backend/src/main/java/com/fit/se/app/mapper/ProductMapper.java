package com.fit.se.app.mapper;

import com.fit.se.app.dto.response.ProductDTO;
import com.fit.se.app.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDTO toProductDTO(Product product);

    List<ProductDTO> toProductDTOs(List<Product> products);
}
