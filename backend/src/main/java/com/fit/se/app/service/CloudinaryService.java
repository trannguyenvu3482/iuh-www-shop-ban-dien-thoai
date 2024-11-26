package com.fit.se.app.service;

import com.cloudinary.utils.ObjectUtils;
import com.fit.se.app.config.CloudinaryConfig;
import com.fit.se.app.dto.response.ResponseUserDTO;
import com.fit.se.app.entity.User;
import com.fit.se.app.mapper.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class CloudinaryService {
    private final CloudinaryConfig cloudinaryConfig;
    private final UserService userService;
    private final UserMapper userMapper;

    public CloudinaryService(CloudinaryConfig cloudinaryConfig, UserService userService, UserMapper userMapper) {
        this.cloudinaryConfig = cloudinaryConfig;
        this.userService = userService;
        this.userMapper = userMapper;
    }

    public String upload(String email, MultipartFile file) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            try {
                Map uploadResult = cloudinaryConfig.config().uploader().upload(file.getBytes(), ObjectUtils.asMap("asset_folder", "main"));
                return uploadResult.get("url").toString();
            } catch (Exception ex) {
                return null;
            }
        } else {
            throw new IllegalArgumentException("Không tìm thấy user");
        }
    }

    public ResponseUserDTO uploadAvatar(String email, MultipartFile file) {
        User user = userService.getUserByEmail(email);

        if (user != null) {
            String imageUrl = upload(email, file);

            user.setAvatarUrl(imageUrl);
            User updatedUser = userService.updateUser(user);
            return userMapper.toUserDTO(updatedUser);
        } else {
            throw new IllegalArgumentException("Không tìm thấy user");
        }
    }
}
