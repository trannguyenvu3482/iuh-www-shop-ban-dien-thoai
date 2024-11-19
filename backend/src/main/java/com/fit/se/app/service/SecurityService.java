package com.fit.se.app.service;

import com.nimbusds.jose.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Service
public class SecurityService {
    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;

    @Value("${security.jwt.secret-key}")
    private String jwtKey;

    @Value("${security.jwt.expiration-time}")
    private String jwtExpiration;


    public void createToken(Authentication authentication) {
        // Create token

    }
}
