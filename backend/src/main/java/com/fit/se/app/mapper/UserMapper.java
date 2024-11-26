package com.fit.se.app.mapper;

import com.fit.se.app.dto.response.ResponseUserDTO;
import com.fit.se.app.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    ResponseUserDTO toUserDTO(User user);

    List<ResponseUserDTO> toUserDTOs(List<User> users);
}
