package com.fit.se.app.controller;

import com.fit.se.app.dto.response.ResPaginationDTO;
import com.fit.se.app.entity.User;
import com.fit.se.app.service.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    ResponseEntity<User> createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User createdUser = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping
    ResponseEntity<ResPaginationDTO> getUsers(
            @RequestParam("current") Optional<String> currentOptional,
            @RequestParam("pageSize") Optional<String> pageSizeOptional
    ) {
        String sCurrent = currentOptional.orElse("");
        String sPageSize = pageSizeOptional.orElse("");

        Pageable pageable;
        if (sCurrent.isEmpty() || sPageSize.isEmpty()) {
            pageable = Pageable.unpaged();
        } else {
            int current = Integer.parseInt(sCurrent);
            int pageSize = Integer.parseInt(sPageSize);
            pageable = PageRequest.of(current - 1, pageSize);
        }

        return ResponseEntity.ok(userService.getUsers(pageable));
    }

    @GetMapping("/{id}")
    ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PutMapping
    ResponseEntity<User> updateUser(@RequestBody User user) {
        User updatedUser = userService.saveUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
