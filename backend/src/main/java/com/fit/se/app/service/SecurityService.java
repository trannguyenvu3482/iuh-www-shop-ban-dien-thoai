package com.fit.se.app.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class SecurityService {
    private final JwtEncoder jwtEncoder;

    public SecurityService(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;

    @Value("${security.jwt.secret-key}")
    private String jwtKey;

    @Value("${security.jwt.expiration-time}")
    private String jwtExpiration;


    public String createToken(Authentication authentication) {
        Instant now = Instant.now();
        Instant validUntil = now.plusSeconds(Long.parseLong(jwtExpiration));

        JwtClaimsSet claims = JwtClaimsSet
                .builder()
                .issuedAt(now)
                .expiresAt(validUntil)
                .subject(authentication.getName())
                .claim("fit-se", authentication).build();

        JwsHeader header = JwsHeader.with(JWT_ALGORITHM).build();
        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}
