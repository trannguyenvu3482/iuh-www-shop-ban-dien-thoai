package com.fit.se.app.mapper;

import com.fit.se.app.dto.response.ResponseOrderDTO;
import com.fit.se.app.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface OrderMapper {
    ResponseOrderDTO toResponseOrderDTO(Order order);

    List<ResponseOrderDTO> toResponseOrderDTOs(List<Order> orders);
}
