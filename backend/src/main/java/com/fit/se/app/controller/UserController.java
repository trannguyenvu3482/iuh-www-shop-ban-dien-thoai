package com.fit.se.app.controller;

import com.fit.se.app.common.annotation.ApiMessage;
import com.fit.se.app.dto.response.ResponsePaginationDTO;
import com.fit.se.app.dto.response.ResponseUserDTO;
import com.fit.se.app.entity.User;
import com.fit.se.app.service.CloudinaryService;
import com.fit.se.app.service.UserService;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final CloudinaryService cloudinaryService;

    public UserController(UserService userService, PasswordEncoder passwordEncoder, CloudinaryService cloudinaryService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping
    @ApiMessage("Create a new user")
    ResponseEntity<ResponseUserDTO> createUser(@Valid @RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        ResponseUserDTO createdUser = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping
    @ApiMessage("Fetch all users")
    ResponseEntity<ResponsePaginationDTO> getUsers(
            @Filter Specification<User> spec,
            Pageable pageable
    ) {
        return ResponseEntity.ok(userService.getUsers(spec, pageable));
    }

    @GetMapping("/{id}")
    @ApiMessage("Fetch a user by id")
    ResponseEntity<ResponseUserDTO> getUserById(@PathVariable Integer id) {
        ResponseUserDTO user = userService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PutMapping
    @ApiMessage("Update a user")
    ResponseEntity<ResponseUserDTO> updateUser(@RequestBody User user) {
        ResponseUserDTO updatedUser = userService.saveUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/upload-avatar")
    @ApiMessage("Upload an avatar")
    ResponseEntity<ResponseUserDTO> uploadAvatar(@RequestParam String email, @RequestParam MultipartFile file) {
        ResponseUserDTO updatedUser = cloudinaryService.uploadAvatar(email, file);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete a user")
    ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
