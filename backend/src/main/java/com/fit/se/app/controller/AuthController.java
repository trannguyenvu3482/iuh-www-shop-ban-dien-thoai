package com.fit.se.app.controller;

import com.fit.se.app.common.annotation.ApiMessage;
import com.fit.se.app.dto.request.RequestLoginDTO;
import com.fit.se.app.dto.response.ResponseLoginDTO;
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
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
    public ResponseEntity<ResponseLoginDTO> login(@Valid @RequestBody RequestLoginDTO requestLoginDTO) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(requestLoginDTO.getUsername(), requestLoginDTO.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResponseLoginDTO responseLoginDTO = new ResponseLoginDTO();
        User currentUser = userService.getUserByEmail(requestLoginDTO.getUsername());

        ResponseLoginDTO.UserLogin userLogin = new ResponseLoginDTO.UserLogin(currentUser.getId(), currentUser.getEmail(), currentUser.getName(), currentUser.getPhoneNumber(), currentUser.getAddress(), currentUser.getUserType());
        responseLoginDTO.setUser(userLogin);

        // Create token
        String access_token = securityService.createAccessToken(authentication.getName(), responseLoginDTO.getUser());
        responseLoginDTO.setAccessToken(access_token);

        // Create refresh token
        String refresh_token = securityService.createRefreshToken(requestLoginDTO.getUsername(), responseLoginDTO);
        userService.updateUserToken(refresh_token, requestLoginDTO.getUsername());

        // Set cookie
        ResponseCookie resCookie = ResponseCookie.from("refresh_token", refresh_token)
                .httpOnly(true)
                .path("/")
                .maxAge(Integer.parseInt(refreshTokenExpiration))
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, resCookie.toString())
                .body(responseLoginDTO);
    }

    @GetMapping("/account")
    @ApiMessage("Get account successfully")
    public ResponseEntity<ResponseLoginDTO.UserGetAccount> getAccount() {
        String email = SecurityService.getCurrentUserLogin().isPresent() ? SecurityService.getCurrentUserLogin().get() : "";

        ResponseLoginDTO responseLoginDTO = new ResponseLoginDTO();
        User currentUser = userService.getUserByEmail(email);

        ResponseLoginDTO.UserLogin userLogin = new ResponseLoginDTO.UserLogin();
        ResponseLoginDTO.UserGetAccount userGetAccount = new ResponseLoginDTO.UserGetAccount();

        if (currentUser != null) {
            userLogin.setId(currentUser.getId());
            userLogin.setEmail(currentUser.getEmail());
            userLogin.setName(currentUser.getName());
            userGetAccount.setUser(userLogin);

        }
        return ResponseEntity.ok(userGetAccount);
    }

    @GetMapping("/refresh-token")
    @ApiMessage("Get user token successfully")
    public ResponseEntity<ResponseLoginDTO> refreshToken(@CookieValue(value = "refresh_token", defaultValue = "") String refreshToken) throws Exception {
        if (refreshToken.isEmpty()) {
            throw new Exception("Bạn không có refresh_token ở cookies");
        }

        // Get refresh token from cookies
        Jwt decodedToken = this.securityService.checkValidAccessToken(refreshToken);
        String email = decodedToken.getSubject();

        // Check user
        User user = userService.getUserByRefreshTokenAndEmail(refreshToken, email);
        if (user == null) {
            throw new Exception("Refresh token không hợp lệ");
        }

        // Create token
        ResponseLoginDTO responseLoginDTO = new ResponseLoginDTO();
        User currentUser = userService.getUserByEmail(email);

        ResponseLoginDTO.UserLogin userLogin = new ResponseLoginDTO.UserLogin(currentUser.getId(), currentUser.getEmail(), currentUser.getName(), currentUser.getPhoneNumber(), currentUser.getAddress(), currentUser.getUserType());
        responseLoginDTO.setUser(userLogin);

        String access_token = securityService.createAccessToken(email, responseLoginDTO.getUser());
        responseLoginDTO.setAccessToken(access_token);

        // Create refresh token
        // String newRefreshToken = securityService.createRefreshToken(email, responseLoginDTO);
        // userService.updateUserToken(newRefreshToken, email);

        // Set cookie
        // ResponseCookie resCookie = ResponseCookie.from("refresh_token", newRefreshToken)
        //         .httpOnly(true)
        //         .path("/")
        //         .maxAge(Integer.parseInt(refreshTokenExpiration))
        //         .build();
        // return ResponseEntity.ok()
        //         .header(HttpHeaders.SET_COOKIE, resCookie.toString())
        //         .body(responseLoginDTO);

        return ResponseEntity.ok(responseLoginDTO);
    }

    @GetMapping("/logout")
    @ApiMessage("Logout successfully")
    public ResponseEntity<Void> logout() throws Exception {
        String email = SecurityService.getCurrentUserLogin().isPresent() ? SecurityService.getCurrentUserLogin().get() : "";

        if (email.isEmpty()) {
            throw new Exception("Access token không hợp lệ");
        }

        userService.updateUserToken(null, email);

        ResponseCookie resCookie = ResponseCookie.from("refresh_token", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, resCookie.toString()).body(null);
    }
}
