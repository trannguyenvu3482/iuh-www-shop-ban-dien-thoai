package com.fit.se.app.controller;

import com.fit.se.app.dto.request.RequestCartDetailDTO;
import com.fit.se.app.dto.response.ResponseCartDTO;
import com.fit.se.app.entity.User;
import com.fit.se.app.service.CartService;
import com.fit.se.app.service.SecurityService;
import com.fit.se.app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    private final CartService cartService;
    private final UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ResponseCartDTO> getCart() {
        Optional<String> email = SecurityService.getCurrentUserLogin();

        if (email.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        return ResponseEntity.ok(cartService.getCartByUserId(userService.getUserByEmail(email.get()).getId()));
    }

    @PutMapping("/increase")
    public ResponseEntity<ResponseCartDTO> addCartDetail(@Valid @RequestBody RequestCartDetailDTO requestCartDetailDTO) {
        String email = SecurityService.getCurrentUserLogin().orElseThrow(() -> new RuntimeException("User not found"));
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(cartService.increaseCartDetail(requestCartDetailDTO.getProductId(), requestCartDetailDTO.getProductVariantId(), user, requestCartDetailDTO.getQuantity()));
    }

    @PutMapping("/decrease")
    public ResponseEntity<ResponseCartDTO> decreaseCartDetail(@Valid @RequestBody RequestCartDetailDTO requestCartDetailDTO) {
        String email = SecurityService.getCurrentUserLogin().orElseThrow(() -> new RuntimeException("User not found"));
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(cartService.decreaseCartDetail(requestCartDetailDTO.getProductId(), requestCartDetailDTO.getProductVariantId(), user, requestCartDetailDTO.getQuantity()));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ResponseCartDTO> deleteCartDetail(RequestCartDetailDTO requestCartDetailDTO) {
        String email = SecurityService.getCurrentUserLogin().orElseThrow(() -> new RuntimeException("User not found"));
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(cartService.deleteCartDetail(requestCartDetailDTO.getProductId(), requestCartDetailDTO.getProductVariantId(), user));
    }

}
