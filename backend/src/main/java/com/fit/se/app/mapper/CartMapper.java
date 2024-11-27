package com.fit.se.app.mapper;

import com.fit.se.app.dto.response.ResponseCartDTO;
import com.fit.se.app.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CartMapper {
    Cart toCart(ResponseCartDTO responseCartDTO);

    ResponseCartDTO toCartDTO(Cart cart);

}