package com.service.coders.authentication;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.SIG;
import org.springframework.security.core.userdetails.UserDetails;
import javax.crypto.SecretKey;

@Service
public class JwtService {

  SecretKey key = getSecret();

  public String generateToken(String username) {
    Map<String, Object> claims = new HashMap<>();
    return Jwts.builder()
        .claims()
        .add(claims)
        .subject(username)
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 30))
        .and()
        .signWith(getKey())
        .compact();
  }

  private SecretKey getSecret() {
    return SIG.HS256.key().build();
  }

  private SecretKey getKey() {
    return key;
  }

  public String extractUsername(String token) {
    return Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload().getSubject();
  }

  public Boolean validateToken(String token, UserDetails userDetails) {
    return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
  }

  public Boolean isTokenExpired(String token) {
    return Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload().getExpiration()
        .before(new Date());
  }
}
