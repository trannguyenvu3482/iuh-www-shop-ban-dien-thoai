package com.fit.se.app.mapper;

import com.fit.se.app.dto.response.ResponseProductDTO;
import com.fit.se.app.dto.response.ResponseProductDetailDTO;
import com.fit.se.app.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ResponseProductDetailDTO toProductDetailDTO(Product product);

    List<ResponseProductDetailDTO> toProductDetailDTOs(List<Product> products);

    ResponseProductDTO toProductDTO(Product product);

    List<ResponseProductDTO> toProductDTOs(List<Product> products);
}
