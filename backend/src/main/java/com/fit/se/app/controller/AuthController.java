package com.fit.se.app.controller;

import com.fit.se.app.dto.request.LoginDTO;
import com.fit.se.app.dto.response.ResLoginDTO;
import com.fit.se.app.service.SecurityService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityService securityService;

    public AuthController(AuthenticationManagerBuilder authenticationManagerBuilder, SecurityService securityService) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityService = securityService;
    }

    @PostMapping("/login")
    public ResponseEntity<ResLoginDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        // Login with the given credentials
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // Create token
        String access_token = securityService.createToken(authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResLoginDTO resLoginDTO = new ResLoginDTO();
        resLoginDTO.setAccessToken(access_token);
        return ResponseEntity.ok().body(resLoginDTO);
    }
}
