package com.fit.se.app.mapper;

import com.fit.se.app.dto.response.UserDTO;
import com.fit.se.app.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toUserDTO(User user);
}
