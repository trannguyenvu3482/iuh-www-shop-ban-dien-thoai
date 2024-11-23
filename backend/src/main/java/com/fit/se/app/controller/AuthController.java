package com.fit.se.app.controller;

import com.fit.se.app.common.annotation.ApiMessage;
import com.fit.se.app.dto.request.LoginDTO;
import com.fit.se.app.dto.response.ResLoginDTO;
import com.fit.se.app.entity.User;
import com.fit.se.app.service.SecurityService;
import com.fit.se.app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityService securityService;
    private final UserService userService;

    @Value("${security.jwt.refresh-expiration-time}")
    private String refreshTokenExpiration;

    public AuthController(AuthenticationManagerBuilder authenticationManagerBuilder, SecurityService securityService, UserService userService) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityService = securityService;
        this.userService = userService;
    }

    @PostMapping("/login")
    @ApiMessage("Login successfully")
    public ResponseEntity<ResLoginDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResLoginDTO resLoginDTO = new ResLoginDTO();
        User currentUser = userService.getUserByEmail(loginDTO.getUsername());

        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(currentUser.getId(), currentUser.getEmail(), currentUser.getName());
        resLoginDTO.setUser(userLogin);

        // Create token
        String access_token = securityService.createAccessToken(authentication, resLoginDTO.getUser());
        resLoginDTO.setAccessToken(access_token);

        // Create refresh token
        String refresh_token = securityService.createRefreshToken(loginDTO.getUsername(), resLoginDTO);
        userService.updateUserToken(refresh_token, loginDTO.getUsername());

        // Set cookie
        ResponseCookie resCookie = ResponseCookie.from("refresh_token", refresh_token)
                .httpOnly(true)
                .path("/")
                .maxAge(Integer.parseInt(refreshTokenExpiration))
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, resCookie.toString())
                .body(resLoginDTO);
    }

    @GetMapping("/account")
    @ApiMessage("Get account successfully")
    public ResponseEntity<ResLoginDTO.UserLogin> getAccount() {
        String email = SecurityService.getCurrentUserLogin().isPresent() ? SecurityService.getCurrentUserLogin().get() : "";

        ResLoginDTO resLoginDTO = new ResLoginDTO();
        User currentUser = userService.getUserByEmail(email);

        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(currentUser.getId(), currentUser.getEmail(), currentUser.getName());

        return ResponseEntity.ok(userLogin);
    }

    @GetMapping("/refresh-token")
    @ApiMessage("Get user token successfully")
    public ResponseEntity<ResLoginDTO> refreshToken() {
        // Get refresh token from cookies
        @CookieValue(value = "refresh_token") String refreshToken = "";
        Jwt decodedToken = this.securityService.checkValidAccessToken(refreshToken);

        // Get user by refresh token

    }
}
