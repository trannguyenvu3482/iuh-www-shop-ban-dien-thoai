package com.fit.se.app.dto.response;

import com.fit.se.app.common.constant.enums.GenderEnum;
import com.fit.se.app.common.constant.enums.UserTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseUserDTO {
    private Integer id;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private UserTypeEnum userType;
    private GenderEnum gender;
    private Integer loyaltyPoints;
    private Instant createdAt;
    private Instant updatedAt;
}
