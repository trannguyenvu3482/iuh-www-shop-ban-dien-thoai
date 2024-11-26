package com.fit.se.app.mapper;

import com.fit.se.app.dto.response.ResponseProductDetailDTO;
import com.fit.se.app.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ResponseProductDetailDTO toProductDTO(Product product);

    List<ResponseProductDetailDTO> toProductDTOs(List<Product> products);
}
