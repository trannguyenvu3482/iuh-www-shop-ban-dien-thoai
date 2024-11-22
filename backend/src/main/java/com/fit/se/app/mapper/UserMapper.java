package com.fit.se.app.mapper;

import com.fit.se.app.dto.response.UserDTO;
import com.fit.se.app.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toUserDTO(User user);

    List<UserDTO> toUserDTOs(List<User> users);
}
