package com.fit.se.app.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {
    private Integer id;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private String password;
    private String userType;

}
